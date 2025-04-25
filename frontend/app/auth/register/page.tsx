"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FullScreenLoader from "@/app/components/FullScreenLoader"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    document.body.classList.add("bg-gradient-to-br", "from-rose-50", "to-white", "dark:from-gray-900", "dark:to-gray-800")
    return () => {
      document.body.classList.remove("bg-gradient-to-br", "from-rose-50", "to-white", "dark:from-gray-900", "dark:to-gray-800")
    }
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !username || !password) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    const etherealAddressKey = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ email, username, walletAddress: etherealAddressKey }])

    if (insertError) {
      setError(`Could not save user: ${insertError.message}`)
      setLoading(false)
      return
    }

    router.push("/auth/verify-email")
  }

  if (loading) {
    return <FullScreenLoader message="Creating your account…" />
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-xl rounded-2xl">
        <CardHeader className="pt-10 pb-4 text-center">
          <Mail className="mx-auto mb-4 h-10 w-10 text-rose-500 animate-bounce" />
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us—just a few details to get started!
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-10 space-y-6">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

            {/* Username */}
            <div>
              <Label htmlFor="username" className="block text-sm font-medium">
                Username
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </Button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 transition"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-rose-600 hover:underline transition">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
