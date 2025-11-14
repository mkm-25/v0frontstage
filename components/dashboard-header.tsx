"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function DashboardHeader({ showBack = false }: { showBack?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo width={32} height={32} />
        {showBack && (
          <Link href="/app">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Ready for your next interview?</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
          <span className="text-sm font-bold text-primary">JD</span>
        </div>
      </div>
    </div>
  )
}
