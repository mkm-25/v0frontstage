"use client"

import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, CheckCircle2, AlertCircle, Clock } from "lucide-react"

export default function JoinInterviewPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8 space-y-6 animate-fade-in">
        <Card className="bg-card border-border shadow-lg rounded-2xl card-hover">
          <CardHeader className="pb-6 border-b border-border">
            <CardTitle className="text-3xl font-bold tracking-tight">Join Your Interview</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Connect to your live recording session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="p-6 bg-secondary rounded-2xl border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Studio Interview Session</p>
                  <p className="text-sm text-muted-foreground">Live recording in progress</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Session started 5 minutes ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span className="text-sm">All systems operational</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pre-join Requirements</h3>
              <div className="space-y-2">
                {[
                  { title: "Microphone Test", completed: true },
                  { title: "Camera Feed", completed: true },
                  { title: "Internet Connection", completed: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all duration-150"
                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 ${item.completed ? "text-white" : "text-muted-foreground"}`}
                    />
                    <span className={item.completed ? "text-foreground text-sm" : "text-muted-foreground text-sm"}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl font-semibold text-lg transition-all duration-150 hover-scale">
              Join Studio
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 shadow-lg rounded-2xl card-hover border-amber-500/20">
          <CardHeader className="pb-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <CardTitle className="text-base font-semibold">Important Reminders</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="text-sm space-y-3 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Ensure you're in a quiet environment</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Keep your camera and microphone enabled</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Have your prep guide nearby</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>Allow 2-3 minutes for audio/video sync</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
