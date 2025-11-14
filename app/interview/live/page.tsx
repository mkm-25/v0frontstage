"use client"

import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AgentOrb from "@/components/AgentOrb"
import { useState } from "react"

export default function AIIInterviewPage() {
  const [isSessionActive, setIsSessionActive] = useState(false)

  const handleStartSession = () => {
    setIsSessionActive(true)
  }

  const handleStopSession = () => {
    setIsSessionActive(false)
  }

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
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Camera Preview Box */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Camera Preview</h3>
                <div className="aspect-video bg-secondary rounded-2xl border border-border/50 flex items-center justify-center">
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
              </div>

              {/* AI Agent Orb Box */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">AI Agent</h3>
                <div className="aspect-video bg-secondary rounded-2xl border border-border/50 flex items-center justify-center">
                  <AgentOrb isActive={isSessionActive} />
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleStartSession}
                disabled={isSessionActive}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Session
              </Button>
              <Button
                onClick={handleStopSession}
                disabled={!isSessionActive}
                variant="destructive"
                className="flex-1 h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Stop Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

