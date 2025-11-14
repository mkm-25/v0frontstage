import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function JoinInterviewCard() {
  return (
    <Link href="/app/join">
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="mt-2">Your recording studio is ready</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Thu, Nov 7 at 14:00</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20 min duration</span>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-10 rounded-lg">
            Enter Studio
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
