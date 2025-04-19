"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      // Force refresh session from server
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-rose-600" />
        <h1 className="text-2xl font-bold">Please Verify Your Email</h1>
        <p className="text-muted-foreground">
          We’ve sent a confirmation link to your email. Click it to verify your account.
        </p>
        <p className="text-sm text-muted-foreground">
          This page will automatically continue once your email is verified.
        </p>
      </div>
    </div>
  )
}
