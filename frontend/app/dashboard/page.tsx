// app/dashboard/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthProvider"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Clock,
  DollarSign,
  Heart,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Trophy,
  Eye,
  User as UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // While loading or redirecting, show spinner
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading Dashboard...</span>
      </div>
    )
  }

  // Mock data
  const activeAuctions = [
    { id: 1, title: "Vintage Camera Collection", image: "/placeholder.svg", currentBid: 450, timeLeft: "2 days, 5 hours", bids: 12, isWinning: true },
    { id: 2, title: "Modern Abstract Painting", image: "/placeholder.svg", currentBid: 320, timeLeft: "1 day, 3 hours", bids: 8, isWinning: false },
    { id: 3, title: "Antique Wooden Desk", image: "/placeholder.svg", currentBid: 750, timeLeft: "4 days, 12 hours", bids: 15, isWinning: false },
  ]

  const wonAuctions = [
    { id: 4, title: "Vintage Vinyl Records (Set of 10)", image: "/placeholder.svg", finalPrice: 125, date: "April 10, 2025", status: "Paid, Shipping" },
    { id: 5, title: "Handcrafted Ceramic Vase", image: "/placeholder.svg", finalPrice: 85, date: "March 28, 2025", status: "Delivered" },
  ]

  const watchlist = [
    { id: 6, title: "Limited Edition Watch", image: "/placeholder.svg", currentBid: 1200, timeLeft: "6 hours", bids: 25 },
    { id: 7, title: "Signed Sports Memorabilia", image: "/placeholder.svg", currentBid: 580, timeLeft: "3 days, 8 hours", bids: 18 },
  ]

  const sellingItems = [
    { id: 8, title: "Vintage Leather Jacket", image: "/placeholder.svg", currentBid: 175, timeLeft: "5 days, 2 hours", bids: 7, views: 42 },
    { id: 9, title: "Rare Comic Book Collection", image: "/placeholder.svg", currentBid: 320, timeLeft: "2 days, 14 hours", bids: 12, views: 89 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
            <p className="text-muted-foreground">Manage your auctions, bids, and account settings</p>
          </div>
          <div className="mt-4 flex space-x-2 md:mt-0">
            <Link href="/sell" passHref>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <Plus className="mr-2 h-4 w-4" /> Sell an Item
              </Button>
            </Link>
            <Link href="/settings" passHref>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Bids</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Auctions</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 ending soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Watchlist</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">1 with price drop</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bidding" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bidding">Bidding</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="selling">Selling</TabsTrigger>
          </TabsList>

          {/* Bidding */}
          <TabsContent value="bidding" className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Your Active Bids</h2>
            {activeAuctions.length > 0 ? (
              <div className="space-y-4">
                {activeAuctions.map((a) => (
                  <Card key={a.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image src={a.image} alt={a.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/auctions/${a.id}`} className="font-medium hover:underline">{a.title}</Link>
                            <Badge className={a.isWinning ? "bg-green-100 text-green-800" : "text-yellow-600 border-yellow-300"} >
                              {a.isWinning ? "Winning" : "Outbid"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1 h-4 w-4" />${a.currentBid}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />{a.timeLeft}
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Link href={`/auctions/${a.id}`} passHref>
                              <Button size="sm" className="h-8 bg-rose-600 hover:bg-rose-700">Increase Bid</Button>
                            </Link>
                            <Button size="sm" variant="outline" className="h-8">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">No active bids</p>
                  <p className="mb-4 text-sm text-muted-foreground">You're not currently bidding on any auctions.</p>
                  <Link href="/auctions" passHref>
                    <Button>Browse Auctions</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Won */}
          <TabsContent value="won" className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Auctions You've Won</h2>
            {wonAuctions.length > 0 ? (
              <div className="space-y-4">
                {wonAuctions.map((a) => (
                  <Card key={a.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image src={a.image} alt={a.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/auctions/${a.id}`} className="font-medium hover:underline">{a.title}</Link>
                            <Badge className="bg-rose-100 text-rose-800">Won</Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1 h-4 w-4" /> ${a.finalPrice}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" /> {a.date}
                            </div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">Status: {a.status}</div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button size="sm" className="h-8 bg-rose-600 hover:bg-rose-700">View Details</Button>
                            <Button size="sm" variant="outline" className="h-8">Contact Seller</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Trophy className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">No won auctions yet</p>
                  <p className="mb-4 text-sm text-muted-foreground">Keep bidding to win auctions.</p>
                  <Link href="/auctions" passHref>
                    <Button>Browse Auctions</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Watchlist */}
          <TabsContent value="watchlist" className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Your Watchlist</h2>
            {watchlist.length > 0 ? (
              <div className="space-y-4">
                {watchlist.map((a) => (
                  <Card key={a.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image src={a.image} alt={a.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/auctions/${a.id}`} className="font-medium hover:underline">{a.title}</Link>
                            <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50">
                              <Heart className="mr-1 h-4 w-4 fill-rose-500" /> Remove
                            </Button>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1 h-4 w-4" />${a.currentBid}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />{a.timeLeft}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <UserIcon className="mr-1 h-4 w-4" />{a.bids} bids
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Link href={`/auctions/${a.id}`} passHref>
                              <Button size="sm" className="h-8 bg-rose-600 hover:bg-rose-700">Bid Now</Button>
                            </Link>
                            <Button size="sm" variant="outline" className="h-8">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Heart className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">Your watchlist is empty</p>
                  <p className="mb-4 text-sm text-muted-foreground">Add items to your watchlist to keep track of auctions you're interested in.</p>
                  <Link href="/auctions" passHref>
                    <Button>Browse Auctions</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Selling */}
          <TabsContent value="selling" className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Items You're Selling</h2>
            {sellingItems.length > 0 ? (
              <div className="space-y-4">
                {sellingItems.map((a) => (
                  <Card key={a.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image src={a.image} alt={a.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/auctions/${a.id}`} className="font-medium hover:underline">{a.title}</Link>
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1 h-4 w-4" />${a.currentBid}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />{a.timeLeft}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <UserIcon className="mr-1 h-4 w-4" />{a.bids} bids
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Eye className="mr-1 h-4 w-4" />{a.views} views
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button size="sm" className="h-8 bg-rose-600 hover:bg-rose-700">Edit Listing</Button>
                            <Button size="sm" variant="outline" className="h-8">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Package className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="mb-2 text-lg font-medium">You're not selling any items</p>
                  <p className="mb-4 text-sm text-muted-foreground">Start selling your items to earn money.</p>
                  <Link href="/sell" passHref>
                    <Button className="bg-rose-600 hover:bg-rose-700">
                      <Plus className="mr-2 h-4 w-4" /> Sell an Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
