"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import FullScreenLoader from "@/app/components/FullScreenLoader" // adjust the import path if needed

export default function VerifyEmailPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error("Error getting user:", error)
        return
      }

      const user = data?.user

      if (user && user.email_confirmed_at) {
        clearInterval(interval)
        router.push("/auctions")
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [router, supabase])

  return (
    <FullScreenLoader message="Please verify your email. Waiting for confirmation..." />
  )
}
