"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Heart, Menu, LogOut, User, Wallet } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAuth } from "@/app/context/AuthProvider"
import { useWallet } from "@/app/hooks/useWallet"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/app/components/mode-toggle"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  // Integrate wallet hook
  const { account, loading, installed, connectAndSave, installMetaMask } = useWallet()

  const { user } = useAuth()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 md:px-10">

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 pt-6">
            <div className="px-7 flex flex-col gap-5">
              <Link href="/" className="text-2xl font-bold mb-4">
                AuctionHub
              </Link>

              <nav className="flex flex-col gap-3 text-lg">
                <Link href="/auctions" className="hover:text-purple-600 transition">Browse Auctions</Link>
                <Link href="/categories" className="hover:text-purple-600 transition">Categories</Link>
                <Link href="/sell" className="hover:text-purple-600 transition">Sell an Item</Link>
                <Link href="/how-it-works" className="hover:text-purple-600 transition">How It Works</Link>
                <Link href="/faqs" className="hover:text-purple-600 transition">FAQs</Link>
              </nav>

              <div className="border-t pt-4 mt-6 flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user.email}
                    </span>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start hover:bg-rose-100 dark:hover:bg-rose-900/40 text-base py-2.5"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" passHref>
                      <Button variant="outline" className="w-full justify-start text-base py-2.5">
                        <User className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" passHref>
                      <Button className="w-full justify-start bg-rose-600 hover:bg-rose-700 text-white text-base py-2.5">
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
        <Link href="/" className="text-2xl font-bold tracking-tight">
          AuctionHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-[16px] font-medium ml-10">
          <Link href="/auctions" className="hover:text-rose-600 transition">Browse Auctions</Link>
          <Link href="/categories" className="hover:text-rose-600 transition">Categories</Link>
          <Link href="/sell" className="hover:text-rose-600 transition">Sell an Item</Link>
          <Link href="/how-it-works" className="hover:text-rose-600 transition">How It Works</Link>
          <Link href="/faqs" className="hover:text-rose-600 transition">FAQs</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" size="icon" className="hover:text-rose-600">
            <Bell className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-rose-600">
            <Heart className="h-6 w-6" />
          </Button>

          <ModeToggle />

          {/* Wallet Connect */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-rose-600 flex items-center space-x-2"
            onClick={installed ? connectAndSave : installMetaMask}
          >
            <Wallet className="h-5 w-5" />
            <span className="text-sm font-medium">
              {loading
                ? "Checking..."
                : installed
                  ? account
                    ? `${account.slice(0, 6)}…${account.slice(-4)}`
                    : "Connect Wallet"
                  : "Download MetaMask"}
            </span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer border hover:ring-2 hover:ring-rose-500 transition-transform">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                  <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-base hover:text-rose-600">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" className="hidden md:block">
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-base px-4 py-2 shadow-sm">
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