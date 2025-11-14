"use client"

interface AIOrbProps {
  isSpeaking?: boolean
  isActive?: boolean
}

export default function AIOrb({ isSpeaking = false, isActive = false }: AIOrbProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`rounded-full border-2 transition-all duration-300 ${
          isActive
            ? isSpeaking
              ? "bg-primary/30 border-primary"
              : "bg-primary/20 border-primary"
            : "bg-muted border-border"
        }`}
        style={{
          width: isSpeaking ? '160px' : '128px',
          height: isSpeaking ? '160px' : '128px',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive ? "bg-primary/10" : "bg-muted"
          }`}
        >
          {isActive ? (
            <div
              className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                isSpeaking ? "bg-primary/40" : "bg-primary/30"
              }`}
              style={{
                width: isSpeaking ? '80px' : '64px',
                height: isSpeaking ? '80px' : '64px',
                transition: 'width 0.3s ease, height 0.3s ease',
              }}
            >
              {isSpeaking ? (
                <svg
                  className="w-10 h-10 text-primary animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              )}
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isActive && (
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isSpeaking ? "bg-primary/30 animate-ping" : "bg-primary/20"
          }`}
          style={{
            width: isSpeaking ? '160px' : '128px',
            height: isSpeaking ? '160px' : '128px',
            margin: 'auto',
          }}
        />
      )}
    </div>
  )
}

