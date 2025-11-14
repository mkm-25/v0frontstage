// Authentication checks commented out - app is now public
// import { auth, currentUser } from "@clerk/nextjs/server"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export default async function AdminPage() {
  // Authentication checks commented out - app is now public
  // const { userId } = await auth()
  // const user = await currentUser()

  // if (!userId || user?.publicMetadata?.role !== "admin") {
  //   return (
  //     <div className="min-h-screen bg-background p-8">
  //       <div className="max-w-4xl mx-auto">
  //         <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
  //           <h1 className="text-2xl font-bold text-red-600">Access denied — admin only.</h1>
  //           <p className="text-red-500/80 mt-2">You do not have permission to access this page.</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  const supabase = await createClient()

  const [profilesData, deliverablesData, sessionsData] = await Promise.all([
    supabase.from("profiles").select("id, full_name, email, created_at").order("created_at", { ascending: false }),
    supabase
      .from("deliverables")
      .select("id, title, status, video_url, user_id")
      .order("created_at", { ascending: false }),
    supabase
      .from("interview_sessions")
      .select("id, scheduled_at, duration, status, user_id")
      .order("scheduled_at", { ascending: false }),
  ])

  const profiles = profilesData.data || []
  const deliverables = deliverablesData.data || []
  const sessions = sessionsData.data || []

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-foreground/60 mt-2">Manage profiles, deliverables, and interview sessions</p>
        </div>

        {/* Profiles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Profiles</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {profiles.length === 0 ? (
              <div className="p-6 text-center text-foreground/60">No profiles found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Full Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {profiles.map((profile: any) => (
                    <tr key={profile.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-foreground/80 font-mono">{profile.id.slice(0, 8)}...</td>
                      <td className="px-6 py-3 text-sm text-foreground">{profile.full_name || "-"}</td>
                      <td className="px-6 py-3 text-sm text-foreground/80">{profile.email || "-"}</td>
                      <td className="px-6 py-3 text-sm text-foreground/60">
                        {profile.created_at ? format(new Date(profile.created_at), "MMM d, yyyy") : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Deliverables</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {deliverables.length === 0 ? (
              <div className="p-6 text-center text-foreground/60">No deliverables found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Video URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {deliverables.map((deliverable: any) => (
                    <tr key={deliverable.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-foreground/80 font-mono">
                        {deliverable.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">{deliverable.title || "-"}</td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            deliverable.status === "completed"
                              ? "bg-green-500/20 text-green-700"
                              : deliverable.status === "processing"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-gray-500/20 text-gray-700"
                          }`}
                        >
                          {deliverable.status || "unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground/80 font-mono">
                        {deliverable.user_id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground/60">{deliverable.video_url ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Interview Sessions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Interview Sessions</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {sessions.length === 0 ? (
              <div className="p-6 text-center text-foreground/60">No interview sessions found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Scheduled At</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration (min)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sessions.map((session: any) => (
                    <tr key={session.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-foreground/80 font-mono">{session.id.slice(0, 8)}...</td>
                      <td className="px-6 py-3 text-sm text-foreground">
                        {session.scheduled_at ? format(new Date(session.scheduled_at), "MMM d, yyyy HH:mm") : "-"}
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground/80">{session.duration || "-"}</td>
                      <td className="px-6 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            session.status === "completed"
                              ? "bg-green-500/20 text-green-700"
                              : session.status === "scheduled"
                                ? "bg-blue-500/20 text-blue-700"
                                : session.status === "cancelled"
                                  ? "bg-red-500/20 text-red-700"
                                  : "bg-gray-500/20 text-gray-700"
                          }`}
                        >
                          {session.status || "unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground/80 font-mono">
                        {session.user_id.slice(0, 8)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
