"use client"

interface AgentOrbProps {
  isActive?: boolean
}

export default function AgentOrb({ isActive = false }: AgentOrbProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`w-32 h-32 rounded-full border-2 transition-all duration-300 ${
          isActive
            ? "bg-primary/20 border-primary animate-pulse"
            : "bg-muted border-border"
        }`}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive ? "bg-primary/10" : "bg-muted"
          }`}
        >
          {isActive ? (
            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
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
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      )}
    </div>
  )
}

