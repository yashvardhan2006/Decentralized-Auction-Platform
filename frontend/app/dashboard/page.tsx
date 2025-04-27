"use client"

import { useEffect, useState } from "react"
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  // State for DB-driven data
  const [activeAuctions, setActiveAuctions] = useState<any[]>([])
  const [wonAuctions, setWonAuctions] = useState<any[]>([])
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [sellingItems, setSellingItems] = useState<any[]>([])
  const [dbLoading, setDbLoading] = useState(true)

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Fetch dashboard data from DB
  useEffect(() => {
    if (!user) return
    async function fetchData() {
      setDbLoading(true)
      // 1. Get user_id
      const { data: profile } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", user.email)
        .single()
      if (!profile) {
        setDbLoading(false)
        return
      }
      const userId = profile.user_id

      // 2. Active bids (auctions where user is highest bidder or has bid)
      const { data: myBids } = await supabase
        .from("bids")
        .select("item_id, amount")
        .eq("bidder_id", userId)
        .order("bid_time", { ascending: false })
      const uniqueBidItemIds = [...new Set((myBids || []).map((b: any) => b.item_id))]
      let active: any[] = []
      if (uniqueBidItemIds.length) {
        const { data: items } = await supabase
          .from("items")
          .select("item_id, title, category, start_price, end_time, item_images(ipfs_hash, is_primary)")
          .in("item_id", uniqueBidItemIds)
        for (const item of items || []) {
          // Get highest bid for each item
          const { data: topBid } = await supabase
            .from("bids")
            .select("bidder_id, amount")
            .eq("item_id", item.item_id)
            .order("amount", { ascending: false })
            .limit(1)
            .single()
          const isWinning = topBid?.bidder_id === userId
          // Get bid count
          const { count } = await supabase
            .from("bids")
            .select("*", { count: "exact", head: true })
            .eq("item_id", item.item_id)

          // Get image (same logic as auctions page)
          let image = "/placeholder.svg"
          const chosen = item.item_images?.find((i: any) => i.is_primary) || item.item_images?.[0]
          if (chosen) {
            const raw = chosen.ipfs_hash
            if (raw && raw.startsWith("http")) image = raw
            else if (raw) {
              const { data: urlData } = supabase.storage.from("image").getPublicUrl(raw)
              image = urlData.publicUrl
            }
          }

          active.push({
            id: item.item_id,
            title: item.title,
            image,
            currentBid: topBid?.amount ?? item.start_price,
            timeLeft: getTimeLeft(item.end_time),
            bids: count ?? 0,
            isWinning,
          })
        }
      }
      setActiveAuctions(active)

      // 3. Won auctions (user is highest bidder and auction CLOSED)
      const now = new Date()
      let won: any[] = []
      if (uniqueBidItemIds.length) {
        const { data: CLOSEDItems } = await supabase
          .from("items")
          .select("item_id, title, end_time, item_images(ipfs_hash, is_primary)")
          .lt("end_time", now.toISOString())
          .in("item_id", uniqueBidItemIds)
        for (const item of CLOSEDItems || []) {
          const { data: topBid } = await supabase
            .from("bids")
            .select("bidder_id, amount")
            .eq("item_id", item.item_id)
            .order("amount", { ascending: false })
            .limit(1)
            .single()
          if (topBid?.bidder_id === userId) {
            // Get image
            let image = "/placeholder.svg"
            const chosen = item.item_images?.find((i: any) => i.is_primary) || item.item_images?.[0]
            if (chosen) {
              const raw = chosen.ipfs_hash
              if (raw && raw.startsWith("http")) image = raw
              else if (raw) {
                const { data: urlData } = supabase.storage.from("image").getPublicUrl(raw)
                image = urlData.publicUrl
              }
            }
            won.push({
              id: item.item_id,
              title: item.title,
              image,
              finalPrice: topBid.amount,
              date: new Date(item.end_time).toLocaleDateString(),
              status: "Pending", // You can enhance this with payment/shipping info
            })
          }
        }
      }
      setWonAuctions(won)

      // 4. Watchlist
      const { data: watchRows } = await supabase
        .from("watchlists")
        .select("item_id")
        .eq("user_id", userId)
      let watch: any[] = []
      if (watchRows && watchRows.length) {
        const ids = watchRows.map((w: any) => w.item_id)
        const { data: items } = await supabase
          .from("items")
          .select("item_id, title, end_time, start_price, item_images(ipfs_hash, is_primary)")
          .in("item_id", ids)
        for (const item of items || []) {
          const { count } = await supabase
            .from("bids")
            .select("*", { count: "exact", head: true })
            .eq("item_id", item.item_id)
          // Get image
          let image = "/placeholder.svg"
          const chosen = item.item_images?.find((i: any) => i.is_primary) || item.item_images?.[0]
          if (chosen) {
            const raw = chosen.ipfs_hash
            if (raw && raw.startsWith("http")) image = raw
            else if (raw) {
              const { data: urlData } = supabase.storage.from("image").getPublicUrl(raw)
              image = urlData.publicUrl
            }
          }
          watch.push({
            id: item.item_id,
            title: item.title,
            image,
            currentBid: item.start_price,
            timeLeft: getTimeLeft(item.end_time),
            bids: count ?? 0,
          })
        }
      }
      setWatchlist(watch)

      // 5. Selling (items created by user)
      const { data: selling } = await supabase
        .from("items")
        .select("item_id, title, end_time, start_price, status, item_images(ipfs_hash, is_primary)")
        .eq("created_by", userId)
      let sellingArr: any[] = []
      for (const item of selling || []) {
        const { count } = await supabase
          .from("bids")
          .select("*", { count: "exact", head: true })
          .eq("item_id", item.item_id)
        // Get image
        let image = "/placeholder.svg"
        const chosen = item.item_images?.find((i: any) => i.is_primary) || item.item_images?.[0]
        if (chosen) {
          const raw = chosen.ipfs_hash
          if (raw && raw.startsWith("http")) image = raw
          else if (raw) {
            const { data: urlData } = supabase.storage.from("image").getPublicUrl(raw)
            image = urlData.publicUrl
          }
        }
        sellingArr.push({
          id: item.item_id,
          title: item.title,
          image,
          currentBid: item.start_price,
          timeLeft: getTimeLeft(item.end_time),
          bids: count ?? 0,
          views: 0,
          status: item.status,
        })
      }
      setSellingItems(sellingArr)
      setDbLoading(false)
    }
    fetchData()
    // eslint-disable-next-line
  }, [user])

  // Remove from watchlist
  async function handleRemoveWatch(itemId: number) {
    if (!user) return
    const { data: profile } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", user.email)
      .single()
    if (!profile) return
    await supabase
      .from("watchlists")
      .delete()
      .eq("user_id", profile.user_id)
      .eq("item_id", itemId)
    setWatchlist(watchlist.filter((a) => a.id !== itemId))
  }

  // While loading or redirecting, show spinner
  if (loading || !user || dbLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading Dashboard...</span>
      </div>
    )
  }

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
              <div className="text-2xl font-bold">{activeAuctions.length}</div>
              <p className="text-xs text-muted-foreground">Active bids</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Auctions</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellingItems.length}</div>
              <p className="text-xs text-muted-foreground">You're selling</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Watchlist</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchlist.length}</div>
              <p className="text-xs text-muted-foreground">Items watched</p>
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
                            {a.status === "CLOSED" ? (
                              <Badge className="bg-gray-300 text-gray-700">Sold</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1 h-4 w-4" />{a.currentBid}
                            </div>
                            
                            <div className="flex items-center text-muted-foreground">
                              <UserIcon className="mr-1 h-4 w-4" />{a.bids} bids
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Eye className="mr-1 h-4 w-4" />{a.views} views
                            </div>
                          </div>
                          <div className="mt-3 flex items-center ">
                            <Link className="flex gap-4" href={`/auctions/${a.id}`} passHref>
                              {a.status !== "CLOSED" && (
                                <Button size="md p-2" className="h-8 bg-rose-600 hover:bg-rose-700">Edit Listing</Button>
                              )}
                              <Button size="sm" variant="outline" className="h-8">View Details</Button>
                            </Link>
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
                            <Link href={`/auctions/${a.id}`} passHref>
                              <Button size="sm" className="h-8 bg-rose-600 hover:bg-rose-700">View Details</Button>
                            </Link>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-rose-600 hover:bg-rose-50"
                              onClick={() => handleRemoveWatch(a.id)}
                            >
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
                            <Link href={`/auctions/${a.id}`} passHref>
                              <Button size="sm" variant="outline" className="h-8">View Details</Button>
                            </Link>
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

         
        </Tabs>
      </div>
    </div>
  )
}

// Helper to format time left
function getTimeLeft(endTime: string) {
  const end = new Date(endTime).getTime()
  const now = Date.now()
  const diff = Math.max(end - now, 0)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  if (mins > 0) return `${mins}m`
  return "CLOSED"
}