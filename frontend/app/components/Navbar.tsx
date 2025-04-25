"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Heart, Menu, LogOut, User } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { useAuth } from "@/app/context/AuthProvider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/app/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

export default function Navbar() {
  const { user } = useAuth()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
  <div className="flex h-16 w-full items-center justify-between px-4">

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 pt-6">
            <div className="px-7 flex flex-col gap-4">
              <Link href="/" className="text-2xl font-bold mb-4">
                AuctionHub
              </Link>

              <nav className="flex flex-col gap-3 text-lg">
                <Link href="/auctions" className="hover:text-rose-600 transition">Browse Auctions</Link>
                <Link href="/categories" className="hover:text-rose-600 transition">Categories</Link>
                <Link href="/sell" className="hover:text-rose-600 transition">Sell an Item</Link>
                <Link href="/how-it-works" className="hover:text-rose-600 transition">How It Works</Link>
                <Link href="/faqs" className="hover:text-rose-600 transition">FAQs</Link>
              </nav>

              <div className="border-t pt-4 mt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user.email}
                    </span>
                    <Button
                      variant="outline"
                      className="justify-start w-full hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-transform duration-200 hover:scale-[1.02] text-base py-2.5"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" passHref>
                      <Button
                        variant="outline"
                        className="justify-start w-full hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-transform duration-200 hover:scale-[1.02] text-base py-2.5"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" passHref>
                      <Button className="w-full justify-start bg-rose-600 hover:bg-rose-700 text-white transition-transform hover:scale-[1.03] duration-200 shadow-sm">
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
        <Link href="/" className="text-2xl font-bold">
          AuctionHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 ml-8 text-lg font-medium">
          <Link href="/auctions" className="hover:text-rose-600 transition">Browse Auctions</Link>
          <Link href="/categories" className="hover:text-rose-600 transition">Categories</Link>
          <Link href="/sell" className="hover:text-rose-600 transition">Sell an Item</Link>
          <Link href="/how-it-works" className="hover:text-rose-600 transition">How It Works</Link>
          <Link href="/faqs" className="hover:text-rose-600 transition">FAQs</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-3 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:cursor-pointer hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all duration-200 rounded-md p-2"
          >
            <Bell className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:cursor-pointer hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all duration-200 rounded-md p-2"
          >
            <Heart className="h-6 w-6" />
          </Button>

          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer border hover:ring-2 hover:ring-rose-500 hover:scale-105 transition-transform duration-200">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                  <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-lg hover:cursor-pointer hover:text-rose-600 transition"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" className="hidden md:block">
                <Button
                  size="sm"
                  className="text-lg hover:cursor-pointer bg-rose-600 hover:bg-rose-700 text-white transition-transform hover:scale-[1.03] duration-200 shadow-sm"
                >
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
