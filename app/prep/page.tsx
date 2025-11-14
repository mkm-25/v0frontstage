import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Zap, Users, Settings } from "lucide-react"

export default function PrepGuidePage() {
  const tips = [
    {
      icon: Lightbulb,
      title: "Lighting Tips",
      description: "Natural light from the side creates the best appearance. Avoid backlighting.",
    },
    {
      icon: Zap,
      title: "Audio Quality",
      description: "Use a dedicated microphone for crisp, clear audio. Test levels beforehand.",
    },
    {
      icon: Users,
      title: "Framing & Positioning",
      description: "Position camera at eye level. Leave space above your head for a natural look.",
    },
    {
      icon: Settings,
      title: "Technical Setup",
      description: "Close background apps, use a wired connection, and test your camera beforehand.",
    },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8">
        <Card className="bg-card border-border shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Prep Guide</CardTitle>
            <CardDescription>Setup tips and best practices for your recording</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, i) => {
            const Icon = tip.icon
            return (
              <Card key={i} className="bg-card border-border shadow-sm">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-card border-border shadow-sm mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3">Quick Checklist Before Recording</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-primary flex items-center justify-center">✓</span>
                Camera is positioned at eye level
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-primary flex items-center justify-center">✓</span>
                Lighting is soft and even across your face
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-primary flex items-center justify-center">✓</span>
                Microphone is positioned 6-8 inches away
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-primary flex items-center justify-center">✓</span>
                Background is clean and professional
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-primary flex items-center justify-center">✓</span>
                Topics and talking points are prepared
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
