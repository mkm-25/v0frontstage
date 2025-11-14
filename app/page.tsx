"use client"

import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, Video } from "lucide-react"
// Authentication imports commented out - app is now public
// import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

const isDesignPreview =
  typeof window !== "undefined" &&
  (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_V0_PREVIEW === "true")

export default function HomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <DashboardHeader showBack={false} />

      {isDesignPreview ? (
        <div className="mt-8 space-y-6 animate-fade-in">
          <Card className="bg-card border-border shadow-lg rounded-2xl card-hover">
            <CardHeader className="pb-6 border-b border-border">
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Your Recording Studio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Calendar, label: "Date & Time", value: "Thu, Nov 7 at 14:00" },
                  { icon: Clock, label: "Duration", value: "20 minutes" },
                  { icon: Video, label: "Status", value: "Ready to Go" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="p-4 bg-secondary rounded-2xl border border-border/50 hover-scale">
                      <Icon className="w-5 h-5 text-foreground mb-3" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-sm">{item.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pre-Interview Checklist</h3>
                <div className="space-y-2">
                  {[
                    { title: "Lighting Setup", completed: true },
                    { title: "Audio Equipment Check", completed: true },
                    { title: "Topics Prepared", completed: true },
                    { title: "Camera Test", completed: false },
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

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale">
                Enter Studio
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Authentication checks commented out - app is now public
        <div className="mt-8 space-y-6 animate-fade-in">
          <Card className="bg-card border-border shadow-lg rounded-2xl card-hover">
            <CardHeader className="pb-6 border-b border-border">
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Your Recording Studio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Calendar, label: "Date & Time", value: "Thu, Nov 7 at 14:00" },
                  { icon: Clock, label: "Duration", value: "20 minutes" },
                  { icon: Video, label: "Status", value: "Ready to Go" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="p-4 bg-secondary rounded-2xl border border-border/50 hover-scale">
                      <Icon className="w-5 h-5 text-foreground mb-3" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-sm">{item.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Pre-Interview Checklist</h3>
                <div className="space-y-2">
                  {[
                    { title: "Lighting Setup", completed: true },
                    { title: "Audio Equipment Check", completed: true },
                    { title: "Topics Prepared", completed: true },
                    { title: "Camera Test", completed: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all duration-150"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 ${item.completed ? "text-white" : "text-muted-foreground"}`}
                      />
                      <span
                        className={item.completed ? "text-foreground text-sm" : "text-muted-foreground text-sm"}
                      >
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-2xl font-semibold text-base transition-all duration-150 hover-scale">
                Enter Studio
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
