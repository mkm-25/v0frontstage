/**
 * OpenAI Realtime API WebSocket Client
 * Handles WebRTC audio/video streams and OpenAI Realtime WebSocket connection
 * 
 * Note: Browser WebSocket doesn't support custom headers, so authentication
 * must be handled via a server-side proxy or the API key must be public.
 * For production, use a server-side WebSocket proxy.
 */

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export interface RealtimeClientCallbacks {
  onStatusChange?: (status: ConnectionStatus) => void
  onTranscript?: (text: string, isUser: boolean) => void
  onAISpeaking?: (isSpeaking: boolean) => void
  onError?: (error: Error) => void
}

export class RealtimeClient {
  private ws: WebSocket | null = null
  private audioContext: AudioContext | null = null
  private mediaStream: MediaStream | null = null
  private processor: ScriptProcessorNode | null = null
  private isConnected = false
  private callbacks: RealtimeClientCallbacks = {}
  private audioQueue: Int16Array[] = []

  constructor(callbacks: RealtimeClientCallbacks = {}) {
    this.callbacks = callbacks
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      throw new Error('Already connected')
    }

    this.callbacks.onStatusChange?.('connecting')

    try {
      // Get user media (audio required, video optional)
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: true,
      })

      // Initialize audio context with 24kHz sample rate (OpenAI requirement)
      this.audioContext = new AudioContext({ sampleRate: 24000 })

      // Connect to OpenAI Realtime WebSocket
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not set')
      }

      // Note: Browser WebSocket doesn't support custom headers
      // For production, use a server-side WebSocket proxy
      // For now, we'll connect and handle auth via session.update
      const wsUrl = 'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview'
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        // Send session configuration immediately
        this.ws?.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              modalities: ['text', 'audio'],
              instructions:
                'You are a professional interviewer. Ask one question at a time. Wait until the user finishes speaking before responding. Keep responses short, sharp, and engaging.',
              voice: 'alloy',
              input_audio_format: 'pcm16',
              output_audio_format: 'pcm16',
              input_audio_transcription: {
                model: 'whisper-1',
              },
              turn_detection: {
                type: 'server_vad',
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 500,
              },
            },
          })
        )

        this.isConnected = true
        this.callbacks.onStatusChange?.('connected')
        this.setupAudioStream()

        // Start the session
        setTimeout(() => {
          this.ws?.send(JSON.stringify({ type: 'response.create' }))
        }, 200)
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.callbacks.onStatusChange?.('error')
        this.callbacks.onError?.(new Error('WebSocket connection error'))
      }

      this.ws.onclose = (event) => {
        this.isConnected = false
        this.callbacks.onStatusChange?.('disconnected')
        if (event.code !== 1000) {
          this.callbacks.onError?.(new Error(`WebSocket closed: ${event.code} ${event.reason}`))
        }
        this.cleanup()
      }
    } catch (error) {
      this.callbacks.onStatusChange?.('error')
      this.callbacks.onError?.(error instanceof Error ? error : new Error('Connection failed'))
      throw error
    }
  }

  private setupAudioStream(): void {
    if (!this.audioContext || !this.mediaStream) return

    const source = this.audioContext.createMediaStreamSource(this.mediaStream)

    // Create a script processor node for audio processing
    const bufferSize = 4096
    this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1)

    this.processor.onaudioprocess = (e) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return

      const inputData = e.inputBuffer.getChannelData(0)
      const pcm16 = this.convertFloat32ToInt16(inputData)

      // Send audio to OpenAI in chunks
      this.ws.send(
        JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: Array.from(pcm16),
        })
      )
    }

    source.connect(this.processor)
    // Don't connect processor to destination to avoid feedback
  }

  private convertFloat32ToInt16(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length)
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]))
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff
    }
    return int16Array
  }

  private handleMessage(data: any): void {
    switch (data.type) {
      case 'session.created':
        console.log('Session created:', data.session)
        break

      case 'session.updated':
        console.log('Session updated:', data.session)
        break

      case 'input_audio_buffer.speech_started':
        console.log('User started speaking')
        this.callbacks.onTranscript?.('', true)
        break

      case 'input_audio_buffer.speech_stopped':
        console.log('User stopped speaking')
        break

      case 'input_audio_buffer.committed':
        // User audio committed, waiting for response
        break

      case 'response.audio_transcript.delta':
        if (data.delta) {
          this.callbacks.onTranscript?.(data.delta, false)
        }
        break

      case 'response.audio_transcript.done':
        if (data.transcript) {
          this.callbacks.onTranscript?.(data.transcript, false)
        }
        break

      case 'response.audio.delta':
        // AI is speaking - play audio
        if (data.delta && this.audioContext) {
          this.callbacks.onAISpeaking?.(true)
          this.playAudioChunk(data.delta)
        }
        break

      case 'response.audio.done':
        this.callbacks.onAISpeaking?.(false)
        break

      case 'response.done':
        // Response complete, create next response to continue listening
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          setTimeout(() => {
            this.ws?.send(JSON.stringify({ type: 'response.create' }))
          }, 100)
        }
        break

      case 'error':
        const errorMsg = data.error?.message || 'Unknown error'
        console.error('OpenAI Realtime error:', errorMsg)
        this.callbacks.onError?.(new Error(errorMsg))
        break

      default:
        // Log unknown event types for debugging
        if (data.type && !data.type.startsWith('conversation.item')) {
          console.log('Unknown event type:', data.type, data)
        }
    }
  }

  private playAudioChunk(base64Audio: string): void {
    if (!this.audioContext) return

    try {
      // Decode base64 audio
      const binaryString = atob(base64Audio)
      const audioData = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        audioData[i] = binaryString.charCodeAt(i)
      }

      // Convert to Int16Array (PCM16)
      const pcm16 = new Int16Array(audioData.buffer, audioData.byteOffset, audioData.byteLength / 2)

      // Create audio buffer
      const audioBuffer = this.audioContext.createBuffer(1, pcm16.length, 24000)
      const channelData = audioBuffer.getChannelData(0)

      // Convert PCM16 to Float32
      for (let i = 0; i < pcm16.length; i++) {
        channelData[i] = pcm16[i] / 32768.0
      }

      // Play audio
      const source = this.audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(this.audioContext.destination)
      source.start()
    } catch (error) {
      console.error('Error playing audio chunk:', error)
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect')
    }
    this.cleanup()
  }

  private cleanup(): void {
    if (this.processor) {
      this.processor.disconnect()
      this.processor = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop())
      this.mediaStream = null
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(() => {})
      this.audioContext = null
    }

    this.isConnected = false
    this.audioQueue = []
  }

  getMediaStream(): MediaStream | null {
    return this.mediaStream
  }

  getStatus(): ConnectionStatus {
    if (this.isConnected) return 'connected'
    if (this.ws?.readyState === WebSocket.CONNECTING) return 'connecting'
    return 'disconnected'
  }
}
