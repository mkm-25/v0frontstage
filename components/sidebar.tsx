"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Video, FileText, BookOpen, CreditCard, HelpCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Join Interview", href: "/join", icon: Video },
    { label: "Deliverables", href: "/deliverables", icon: FileText },
    { label: "Prep Guide", href: "/prep", icon: BookOpen },
    { label: "Subscription", href: "/subscription", icon: CreditCard },
    { label: "Support", href: "/support", icon: HelpCircle },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col p-6 sticky top-0 animate-slide-in-left">
      {/* Logo */}
      <div className="mb-8">
        <div className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
          <Logo width={120} height={20} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-150 cursor-pointer font-medium text-sm ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Support Card */}
      <div className="mt-auto pt-6 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/5 border border-sidebar-border/40 p-4 rounded-2xl text-center space-y-3 hover-scale">
          <MessageCircle className="w-5 h-5 text-sidebar-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Need help?</p>
            <p className="text-xs text-sidebar-accent-foreground/70">We're here for you</p>
          </div>
          <Button
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-xs h-8 font-medium rounded-xl transition-all duration-150"
            asChild
          >
            <Link href="/support">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
