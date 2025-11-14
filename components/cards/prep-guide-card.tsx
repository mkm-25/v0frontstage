import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Check } from "lucide-react"
import Link from "next/link"

export default function PrepGuideCard() {
  return (
    <Link href="/app/prep">
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Prep Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Setup tips and best practices</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Lighting</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Audio</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Topics</span>
            </div>
          </div>
          <Button variant="outline" className="w-full font-semibold h-10 rounded-lg bg-transparent">
            Read Guide
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
