// app/components/Navbar.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Heart, Menu, Search, User, LogOut } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { useAuth } from "@/app/context/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/app/components/mode-toggle"

export default function Navbar() {
  const { user } = useAuth()
  const supabase = createClientComponentClient()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh() // refresh to update auth context state
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold">AuctionHub</span>
              </Link>
            </div>
            <div className="flex flex-col space-y-3 px-7 pt-6">
              <Link href="/auctions">Browse Auctions</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/sell">Sell an Item</Link>
              <Link href="/how-it-works">How It Works</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="mt-6 px-7">
              <div className="flex flex-col space-y-2">
                {user ? (
                  <>
                    <span className="text-sm">Welcome, {user.email}</span>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" passHref>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" passHref>
                      <Button className="w-full justify-start bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="ml-4 flex items-center md:ml-0">
          <span className="text-xl font-bold">AuctionHub</span>
        </Link>

        {/* Nav Links */}
        <div className="flex w-full items-center md:w-auto">
          <nav className="ml-auto hidden gap-5 md:flex">
            <Link href="/auctions">Browse Auctions</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/sell">Sell an Item</Link>
            <Link href="/how-it-works">How It Works</Link>
          </nav>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden items-center lg:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-60 rounded-lg bg-background pl-8 md:w-80"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Heart className="h-5 w-5" />
          </Button>
          <ModeToggle />
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" className="hidden md:block">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
