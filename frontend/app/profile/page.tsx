import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, MessageSquare, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock user data
const user = {
  name: "Sarah Johnson",
  username: "sarahj",
  avatar: "/placeholder.svg?height=100&width=100",
  location: "New York, NY",
  memberSince: "January 2022",
  bio: "Passionate collector of vintage cameras and vinyl records. Always on the lookout for unique items with history and character.",
  rating: 4.9,
  reviews: 56,
  stats: {
    itemsSold: 34,
    itemsBought: 28,
    activeBids: 5,
    activeListings: 3,
  },
}

// Mock feedback data
const feedback = [
  {
    id: 1,
    user: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Great seller! Item was exactly as described and shipping was fast. Would definitely buy from again.",
    date: "2 weeks ago",
    item: "Vintage Camera",
  },
  {
    id: 2,
    user: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Excellent communication and the item arrived in perfect condition. Very satisfied!",
    date: "1 month ago",
    item: "Vinyl Record Collection",
  },
  {
    id: 3,
    user: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment: "Good transaction overall. Shipping took a bit longer than expected but item was well packaged.",
    date: "2 months ago",
    item: "Antique Desk Lamp",
  },
]

// Mock listings data
const listings = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: 175,
    timeLeft: "5 days, 2 hours",
    bids: 7,
  },
  {
    id: 2,
    title: "Rare Comic Book Collection",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: 320,
    timeLeft: "2 days, 14 hours",
    bids: 12,
  },
  {
    id: 3,
    title: "Antique Wooden Desk",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: 450,
    timeLeft: "3 days, 8 hours",
    bids: 9,
  },
]

export default function ProfilePage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - User Info */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">@{user.username}</p>

                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(user.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {user.rating} ({user.reviews} reviews)
                  </span>
                </div>

                <div className="mt-4 flex w-full flex-col space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Member since {user.memberSince}
                  </div>
                </div>

                <Separator className="my-4" />

                <p className="text-sm text-muted-foreground">{user.bio}</p>

                <div className="mt-6 grid w-full grid-cols-2 gap-2">
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Follow
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>User Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Items Sold</p>
                  <p className="text-2xl font-bold">{user.stats.itemsSold}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Items Bought</p>
                  <p className="text-2xl font-bold">{user.stats.itemsBought}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Bids</p>
                  <p className="text-2xl font-bold">{user.stats.activeBids}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">{user.stats.activeListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="listings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="mt-6">
              <h2 className="mb-4 text-xl font-semibold">Current Listings</h2>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/auctions/${listing.id}`} className="font-medium hover:underline">
                              {listing.title}
                            </Link>
                            <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/30">
                              Active
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                            <div className="text-muted-foreground">Current Bid: ${listing.currentBid}</div>
                            <div className="text-muted-foreground">{listing.bids} bids</div>
                            <div className="text-muted-foreground">{listing.timeLeft} left</div>
                          </div>
                          <div className="mt-3">
                            <Link href={`/auctions/${listing.id}`} passHref>
                              <Button size="sm" className="h-8">
                                View Listing
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">View All Listings</Button>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Feedback & Ratings</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(user.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{user.rating} out of 5</span>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">Based on {user.reviews} reviews</p>

              <div className="mt-6 space-y-6">
                {feedback.map((item) => (
                  <div key={item.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.user} />
                          <AvatarFallback>{item.user.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="font-medium">{item.user}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">{item.comment}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Item: {item.item}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline">View All Reviews</Button>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {user.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Bio</h3>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Vintage Cameras</Badge>
                      <Badge variant="secondary">Vinyl Records</Badge>
                      <Badge variant="secondary">Antiques</Badge>
                      <Badge variant="secondary">Photography</Badge>
                      <Badge variant="secondary">Mid-Century Modern</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Shipping Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Ships from: New York, NY
                      <br />
                      Shipping options: Domestic & International
                      <br />
                      Handling time: 1-2 business days
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Payment Methods Accepted</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline">Credit Card</Badge>
                      <Badge variant="outline">PayPal</Badge>
                      <Badge variant="outline">Apple Pay</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
