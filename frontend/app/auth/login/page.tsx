"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { WavyBackground } from "../../../components/ui/wavy-background";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FullScreenLoader from "@/app/components/FullScreenLoader"
import { useAuth } from "../../context/AuthProvider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const { session, loading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  // redirect if already logged in
  useEffect(() => {
    if (!loading && session) router.push("/dashboard")
  }, [session, loading, router])

  // apply body background gradient classes
  useEffect(() => {
    document.body.classList.add(
      "bg-gradient-to-tr",
      "from-rose-50",
      "to-white",
      "dark:from-gray-900",
      "dark:to-gray-800"
    )
    return () => {
      document.body.classList.remove(
        "bg-gradient-to-tr",
        "from-rose-50",
        "to-white",
        "dark:from-gray-900",
        "dark:to-gray-800"
      )
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }
    setBusy(true)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setBusy(false)
    if (loginError) {
      setError(loginError.message)
    } else {
      router.push("/dashboard")
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  if (loading || busy) {
    return <FullScreenLoader message={busy ? "Signing in…" : "Checking session…"} />
  }

  return (
    <WavyBackground className="max-full mx-auto pb-40">
    <div className="flex mt-10 h-screen w-screen items-center justify-center px-4">
      <Card className="w-full max-w-md mx-4 sm:mx-0 backdrop-blur-sm bg-transparent/50 bg-gradient-to-b from-gray-850 to-[#2C1352] shadow-xl rounded-2xl">
        <CardHeader className="pt-10 pb-4 text-center">
          <User className="mx-auto mb-4 h-10 w-10 text-rose-500 animate-bounce" />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-10 space-y-6">
          {!session ? (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 focus:border-rose-500 focus:ring-rose-500 transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="block text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 focus:border-rose-500 focus:ring-rose-500 transition"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                  </Button>
                </div>
                <div className="mt-1 text-right">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-rose-600 hover:underline transition"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 transition"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                You’re already logged in.
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-rose-600 hover:underline transition">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  </WavyBackground>
    
  )
}
