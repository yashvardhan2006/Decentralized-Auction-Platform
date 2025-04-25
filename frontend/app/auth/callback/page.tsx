// app/auth/callback/page.tsx
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import FullScreenLoader from "@/app/components/FullScreenLoader"
export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (session?.user) {
        // User is logged in, redirect them
        router.push("/auctions")
      } else {
        console.error("Error getting session or user not verified yet:", error)
      }
    }
    checkSession()
  }, [router, supabase])
  return <FullScreenLoader message="Verifying your email... Just a moment while we log you in." />
}
