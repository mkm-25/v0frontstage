"use client"

import { useState, useEffect, useRef } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AIOrb from "@/components/AIOrb"
import { RealtimeClient, ConnectionStatus } from "@/lib/realtime"
// Authentication check commented out - app is now public
// import { useUser } from "@clerk/nextjs"

export default function AIIInterviewPage() {
  // Authentication check commented out - app is now public
  // const { user } = useUser()
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [statusText, setStatusText] = useState("Ready to start")
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const clientRef = useRef<RealtimeClient | null>(null)

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    // Update video element when stream changes
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream
    }
  }, [videoStream])

  useEffect(() => {
    // Update status text based on connection status
    switch (status) {
      case "connecting":
        setStatusText("Connecting...")
        break
      case "connected":
        setStatusText("Listening...")
        break
      case "error":
        setStatusText("Connection error")
        break
      default:
        setStatusText(isAISpeaking ? "Responding..." : "Ready to start")
    }
  }, [status, isAISpeaking])

  const handleStartInterview = async () => {
    // Authentication check commented out - app is now public
    // Use a placeholder user_id
    // if (!user?.id) {
    //   alert("Please sign in to start an interview")
    //   return
    // }

    try {
      // Start interview session via API
      const sessionResponse = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: `public-user-${Date.now()}`,
          notes: "AI Interview Session",
        }),
      })

      if (!sessionResponse.ok) {
        throw new Error("Failed to create session")
      }

      const { sessionId: newSessionId } = await sessionResponse.json()
      setSessionId(newSessionId)

      // Initialize Realtime client
      const client = new RealtimeClient({
        onStatusChange: (newStatus) => {
          setStatus(newStatus)
        },
        onTranscript: (text, isUser) => {
          if (text) {
            console.log(`${isUser ? "User" : "AI"}: ${text}`)
          }
        },
        onAISpeaking: (speaking) => {
          setIsAISpeaking(speaking)
          if (speaking) {
            setStatusText("Responding...")
            // Save clip when AI starts speaking
            saveClip()
          } else {
            setStatusText("Listening...")
            // Save clip when AI stops speaking
            saveClip()
          }
        },
        onError: (error) => {
          console.error("Realtime error:", error)
          setStatusText(`Error: ${error.message}`)
        },
      })

      clientRef.current = client
      await client.connect()

      // Get video stream for preview
      const stream = client.getMediaStream()
      if (stream) {
        setVideoStream(stream)
      }
    } catch (error) {
      console.error("Failed to start interview:", error)
      setStatusText(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
      setStatus("error")
    }
  }

  const handleStopInterview = async () => {
    if (clientRef.current) {
      clientRef.current.disconnect()
      clientRef.current = null
    }

    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop())
      setVideoStream(null)
    }

    setStatus("disconnected")
    setIsAISpeaking(false)
    setStatusText("Ready to start")
    setSessionId(null)
  }

  const saveClip = async () => {
    if (!sessionId) return

    try {
      await fetch("/api/interview/save-clip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          clip_url: null,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Failed to save clip:", error)
    }
  }

  const isActive = status === "connected" || status === "connecting"

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8 space-y-6 animate-fade-in">
        <Card className="bg-card border-border shadow-lg rounded-2xl">
          <CardHeader className="pb-6 border-b border-border">
            <CardTitle className="text-3xl font-bold tracking-tight">AI Interview</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Start a conversation with your AI interview assistant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            {/* Status Text */}
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">{statusText}</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Camera Preview Box */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Camera Preview</h3>
                <div className="aspect-video bg-secondary rounded-2xl border border-border/50 overflow-hidden">
                  {videoStream ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">Camera feed will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Agent Orb Box */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">AI Agent</h3>
                <div className="aspect-video bg-secondary rounded-2xl border border-border/50 flex items-center justify-center">
                  <AIOrb isSpeaking={isAISpeaking} isActive={isActive} />
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleStartInterview}
                disabled={isActive}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Interview
              </Button>
              <Button
                onClick={handleStopInterview}
                disabled={!isActive}
                variant="destructive"
                className="flex-1 h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Stop Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
