"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Heart,
  Menu,
  Search,
  LogOut,
  User,
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { useAuth } from "@/app/context/AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
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
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile menu */}
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
              {user ? (
                <>
                  <span className="text-sm mb-2">Welcome, {user.email}</span>
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
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          AuctionHub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 ml-8">
          <Link href="/auctions" className="hover:text-rose-600 transition">Browse Auctions</Link>
          <Link href="/categories" className="hover:text-rose-600 transition">Categories</Link>
          <Link href="/sell" className="hover:text-rose-600 transition">Sell an Item</Link>
          <Link href="/how-it-works" className="hover:text-rose-600 transition">How It Works</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-2 ml-auto">
          <form className="hidden lg:flex">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                  <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/register" className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-rose-600 hover:bg-rose-700 text-white"
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
