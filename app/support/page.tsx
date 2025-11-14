import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Phone, Clock } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardHeader showBack />

      <div className="mt-8 space-y-6">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Get Help from Our Team</CardTitle>
            <CardDescription>We're here to support you 24/7</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">24-hour Response</p>
                <p className="text-sm text-muted-foreground">Quick support</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Friendly Team</p>
                <p className="text-sm text-muted-foreground">Always helpful</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Multi-channel</p>
                <p className="text-sm text-muted-foreground">Your choice</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Message</label>
                <textarea
                  placeholder="Tell us more..."
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-3">Call us directly</p>
              <p className="font-semibold text-primary">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-3">We'll get back quickly</p>
              <p className="font-semibold text-primary">support@authframe.com</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
