import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

export default function DeliverablesCard() {
  return (
    <Link href="/app/deliverables">
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Your Deliverables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Access edited videos and clips</p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-primary">12</span> Clips •{" "}
              <span className="font-semibold text-primary">1</span> Full •{" "}
              <span className="font-semibold text-primary">48h</span> Time
            </p>
          </div>
          <Button variant="outline" className="w-full font-semibold h-10 rounded-lg bg-transparent">
            View Gallery
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
