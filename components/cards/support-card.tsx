import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export default function SupportCard() {
  return (
    <Link href="/app/support">
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Get help from our team</p>
          <p className="text-sm">24-hour response • Friendly support</p>
          <Button variant="outline" className="w-full font-semibold h-10 rounded-lg bg-transparent">
            Contact Us
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
