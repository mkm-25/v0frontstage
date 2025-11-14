import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import Link from "next/link"

export default function SubscriptionCard() {
  return (
    <Link href="/app/subscription">
      <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CreditCard className="w-6 h-6 text-primary" />
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Active ●</div>
          </div>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Monthly Interview Package</p>
          <p className="text-sm">
            2 interviews/month • 20+ clips total • <span className="font-semibold">$1,100</span>/month
          </p>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-10 rounded-lg">
            Manage Plan
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
