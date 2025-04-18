import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Heart, Menu, Search, User } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./components/mode-toggle"

import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Auction Platform",
  description: "A modern auction platform for buying and selling unique items",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
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
                      <Link href="/auctions" className="flex items-center text-lg font-medium">
                        Browse Auctions
                      </Link>
                      <Link href="/categories" className="flex items-center text-lg font-medium">
                        Categories
                      </Link>
                      <Link href="/sell" className="flex items-center text-lg font-medium">
                        Sell an Item
                      </Link>
                      <Link href="/how-it-works" className="flex items-center text-lg font-medium">
                        How It Works
                      </Link>
                      <Link href="/about" className="flex items-center text-lg font-medium">
                        About Us
                      </Link>
                      <Link href="/contact" className="flex items-center text-lg font-medium">
                        Contact
                      </Link>
                    </div>
                    <div className="mt-6 px-7">
                      <div className="flex flex-col space-y-2">
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
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Link href="/" className="ml-4 flex items-center md:ml-0">
                  <span className="text-xl font-bold">AuctionHub</span>
                </Link>
                <div className="flex w-full items-center md:w-auto">
                  <nav className="ml-auto hidden gap-5 md:flex">
                    <Link href="/auctions" className="text-sm font-medium">
                      Browse Auctions
                    </Link>
                    <Link href="/categories" className="text-sm font-medium">
                      Categories
                    </Link>
                    <Link href="/sell" className="text-sm font-medium">
                      Sell an Item
                    </Link>
                    <Link href="/how-it-works" className="text-sm font-medium">
                      How It Works
                    </Link>
                  </nav>
                </div>
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
                    <span className="sr-only">Notifications</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Favorites</span>
                  </Button>
                  <ModeToggle />
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
                </div>
              </div>
            </header>
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
            <footer className="border-t bg-gray-50 dark:bg-gray-900">
              <div className="container px-4 py-8 md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">About</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/about" className="text-gray-500 hover:underline dark:text-gray-400">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/team" className="text-gray-500 hover:underline dark:text-gray-400">
                          Our Team
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="text-gray-500 hover:underline dark:text-gray-400">
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link href="/press" className="text-gray-500 hover:underline dark:text-gray-400">
                          Press
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/help" className="text-gray-500 hover:underline dark:text-gray-400">
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-gray-500 hover:underline dark:text-gray-400">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="text-gray-500 hover:underline dark:text-gray-400">
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link href="/safety" className="text-gray-500 hover:underline dark:text-gray-400">
                          Safety Center
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/terms" className="text-gray-500 hover:underline dark:text-gray-400">
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-gray-500 hover:underline dark:text-gray-400">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/cookies" className="text-gray-500 hover:underline dark:text-gray-400">
                          Cookie Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/accessibility" className="text-gray-500 hover:underline dark:text-gray-400">
                          Accessibility
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Subscribe</h3>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      Subscribe to our newsletter for the latest updates and exclusive offers.
                    </p>
                    <form className="space-y-2">
                      <Input type="email" placeholder="Your email" className="w-full" />
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                        Subscribe
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="mt-8 border-t pt-8">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      © {new Date().getFullYear()} AuctionHub. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        <span className="sr-only">Facebook</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
