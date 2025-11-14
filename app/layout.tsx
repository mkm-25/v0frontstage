import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
// Authentication imports commented out - app is now public
// import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Sidebar from "@/components/sidebar"
import Logo from "@/components/logo"

import "./globals.css"

import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono, Lora, Plus_Jakarta_Sans as V0_Font_Plus_Jakarta_Sans, IBM_Plex_Mono as V0_Font_IBM_Plex_Mono, Lora as V0_Font_Lora } from 'next/font/google'

// Initialize fonts
const _plusJakartaSans = V0_Font_Plus_Jakarta_Sans({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = V0_Font_Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })

const inter = Inter({ subsets: ["latin"] })
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700"] })
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "auth:frame - Client Dashboard",
  description: "Your premium recording studio and interview management platform",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

const isDesignPreview = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_V0_PREVIEW === "true"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className={`font-sans antialiased`}>
          {/* Authentication checks commented out - app is now public */}
          <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
          {/* 
          {isDesignPreview ? (
            <div className="flex h-screen bg-background">
              <Sidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          ) : (
            <>
              <SignedIn>
                <div className="flex h-screen bg-background">
                  <Sidebar />
                  <main className="flex-1 overflow-auto">{children}</main>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="flex items-center justify-center h-screen bg-background">
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <Logo width={64} height={64} />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">auth:frame</h1>
                    <p className="text-foreground/60 mb-6">Sign in to access your dashboard</p>
                    <SignInButton mode="modal" />
                  </div>
                </div>
              </SignedOut>
            </>
          )}
          */}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
