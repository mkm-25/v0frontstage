import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8 space-y-6">
        <Card className="bg-card border-border shadow-sm border-2 border-primary">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Monthly Interview Package</CardTitle>
                <CardDescription>Your current active plan</CardDescription>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold text-primary">
              $1,100<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold mb-4">What's Included</h3>
              {[
                { included: true, text: "2 interviews per month" },
                { included: true, text: "20+ clips per interview" },
                { included: true, text: "Full edited videos" },
                { included: true, text: "Priority support" },
                { included: true, text: "Cloud storage (48 hours)" },
                { included: false, text: "Custom branding" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className={`w-5 h-5 ${item.included ? "text-green-500" : "text-border"}`} />
                  <span className={item.included ? "text-foreground" : "text-muted-foreground line-through"}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <p className="text-sm text-muted-foreground">Next billing date: December 7, 2025</p>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">Update Plan</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Billing History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Upgrade to Premium
            </CardTitle>
            <CardDescription>Unlock unlimited interviews and advanced features</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Premium Plans</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
