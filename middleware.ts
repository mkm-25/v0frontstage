// Authentication middleware commented out - app is now public
// import { clerkMiddleware } from "@clerk/nextjs/server"

// export default clerkMiddleware()

export default function middleware() {
  // No authentication required - public access
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
