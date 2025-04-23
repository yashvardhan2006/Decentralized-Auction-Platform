"use client"
import Link from "next/link"
import Image from "next/image"
import { Clock, DollarSign, Eye, Flag, Heart, History, Info, Share2, Shield, Tag, Truck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function AuctionDetailPage({params}:{params:{id:string}}) {
  const auction = {
    id: params.id,
    title: "Vintage 1960s Film Camera with Original Leather Case",
    description:
      "This is a beautiful vintage film camera from the 1960s in excellent working condition. The camera comes with its original leather case, strap, and lens cap. The mechanics are smooth, and the lens is clear with no fungus or haze. This would make an excellent addition to any vintage camera collection or a great starter for film photography enthusiasts.",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    currentBid: 450,
    nextMinimumBid: 475,
    startingBid: 200,
    timeLeft: "2 days, 5 hours, 32 minutes",
    bids: 12,
    watchers: 38,
    condition: "Used - Excellent",
    category: "Collectibles",
    subcategory: "Cameras & Photography",
    location: "New York, NY",
    shipping: "Worldwide",
    shippingCost: 15,
    seller: {
      name: "VintageFinds",
      rating: 4.9,
      reviews: 156,
      memberSince: "Jan 2018",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    bidHistory: [
      { user: "collector92", amount: 450, time: "2 hours ago" },
      { user: "vintage_lover", amount: 425, time: "5 hours ago" },
      { user: "camera_enthusiast", amount: 400, time: "8 hours ago" },
      { user: "photo_pro", amount: 375, time: "12 hours ago" },
      { user: "retro_gear", amount: 350, time: "1 day ago" },
    ],
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/auctions" className="text-sm text-muted-foreground hover:underline">
            Auctions
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <Link href="/categories/collectibles" className="text-sm text-muted-foreground hover:underline">
            {auction.category}
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <Link href="/categories/collectibles/cameras" className="text-sm text-muted-foreground hover:underline">
            {auction.subcategory}
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        {/* Left Column - Images */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-lg border">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={auction.image || "/placeholder.svg"}
                alt={auction.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {auction.gallery.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md border">
                <Image src={img || "/placeholder.svg"} alt={`Gallery image ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Item Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{auction.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium">Item Details</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <Tag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Condition: {auction.condition}</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Brand: Vintage Camera Co.</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Year: 1960s</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Features</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Original leather case included</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Manual focus with f/2.8 lens</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Mechanical shutter (no batteries required)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Recently serviced and tested</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Shipping Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium">Shipping Details</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <Truck className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Ships to: {auction.shipping}</span>
                      </li>
                      <li className="flex items-start">
                        <DollarSign className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Shipping cost: ${auction.shippingCost}</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Estimated delivery: 5-7 business days</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Shipping Policies</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <Shield className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Item is insured during shipping</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Tracking number provided</span>
                      </li>
                      <li className="flex items-start">
                        <Flag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Ships from: {auction.location}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="seller" className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={auction.seller.avatar || "/placeholder.svg"} alt={auction.seller.name} />
                    <AvatarFallback>{auction.seller.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{auction.seller.name}</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(auction.seller.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {auction.seller.rating} ({auction.seller.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member since {auction.seller.memberSince}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Contact Seller
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2">
                    View All Items
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column - Auction Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Badge className="mb-2 bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/30">
                    {auction.category}
                  </Badge>
                  <h1 className="text-2xl font-bold">{auction.title}</h1>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Eye className="mr-1 h-4 w-4" />
                    {auction.watchers} people watching
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Current Bid:</span>
                    <span className="text-lg font-bold text-rose-600 dark:text-rose-400">${auction.currentBid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Next Minimum Bid:</span>
                    <span className="font-semibold">${auction.nextMinimumBid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Number of Bids:</span>
                    <Link
                      href="#bid-history"
                      className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
                    >
                      {auction.bids} bids
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Time Left:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">{auction.timeLeft}</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Auction ends on April 22, 2025 at 3:45 PM EDT
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="bid-amount" className="text-sm font-medium">
                      Your Maximum Bid
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Ξ</span>
                      <Input
                        id="bid-amount"
                        type="number"
                        min={auction.nextMinimumBid}
                        step="0.01"
                        defaultValue={auction.nextMinimumBid}
                        className="pl-7"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enter Ξ{auction.nextMinimumBid} or more</p>
                  </div>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                    Place Bid with Wallet
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <h3 className="mb-2 font-semibold">Bid with Confidence</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Shield className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                      <span>Smart Contract Protection: Funds held in escrow until item is received</span>
                    </li>
                    <li className="flex items-start">
                      <User className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                      <span>Verified Seller with {auction.seller.reviews} positive reviews</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-4 w-4 mt-0.5 text-gray-500"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <span>Decentralized transaction with immutable blockchain record</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6" id="bid-history">
            <h3 className="mb-4 text-lg font-semibold flex items-center">
              <History className="mr-2 h-5 w-5" />
              Bid History
            </h3>
            <div className="rounded-lg border">
              <div className="p-4">
                <div className="space-y-4">
                  {auction.bidHistory.map((bid, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{bid.user.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{bid.user}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{bid.time}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${bid.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
