import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function DeliverablesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let deliverables = []
  let stats = {
    clips: 0,
    fullVideos: 0,
    totalTime: "0h",
    ready: 0,
  }

  if (user) {
    const { data } = await supabase
      .from("deliverables")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    deliverables = data || []
    stats = {
      clips: deliverables.filter((d) => d.title.includes("Clip")).length,
      fullVideos: deliverables.filter((d) => d.title.includes("Full")).length,
      totalTime: `${deliverables.length * 4}h`,
      ready: deliverables.filter((d) => d.status === "ready").length,
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8">
        <Card className="bg-card border-border shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Your Deliverables</CardTitle>
            <CardDescription>Access your edited videos and clips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.clips}</p>
                <p className="text-muted-foreground">Clips</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.fullVideos}</p>
                <p className="text-muted-foreground">Full Video</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.totalTime}</p>
                <p className="text-muted-foreground">Total Time</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{stats.ready}</p>
                <p className="text-muted-foreground">Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {deliverables.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => (
              <Card key={item.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-secondary rounded-lg h-32 flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description || "Ready to download"}</p>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No deliverables yet</p>
              <p className="text-sm text-muted-foreground">
                Your deliverables will appear here once your interview is complete.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
