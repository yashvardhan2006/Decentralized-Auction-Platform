import Link from "next/link"
import Image from "next/image"
import { Clock, Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Mock data for auctions
const auctions = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Auction Item ${i + 1}`,
  image: "/placeholder.svg?height=200&width=300",
  currentBid: Math.floor(Math.random() * 1000) + 100,
  timeLeft: `${Math.floor(Math.random() * 5) + 1} days, ${Math.floor(Math.random() * 23) + 1} hours`,
  bids: Math.floor(Math.random() * 30) + 1,
  category: ["Art", "Collectibles", "Electronics", "Fashion", "Jewelry"][Math.floor(Math.random() * 5)],
}))

export default function AuctionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Auctions</h1>
          <p className="mt-2 text-gray-500 md:text-xl dark:text-gray-400">Discover unique items and place your bids.</p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  Reset
                </Button>
              </div>
              <div className="p-4 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Categories</h4>
                  <div className="space-y-2">
                    {["Art", "Collectibles", "Electronics", "Fashion", "Jewelry", "Vehicles", "Other"].map(
                      (category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category.toLowerCase()}`} />
                          <label
                            htmlFor={`category-${category.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Price Range</h4>
                  <div className="pt-4">
                    <Slider defaultValue={[0, 1000]} max={5000} step={10} />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">$0</span>
                      <span className="text-sm">$5,000+</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Auction Status</h4>
                  <div className="space-y-2">
                    {["All Auctions", "Ending Soon", "New Listings", "Sold Items"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox id={`status-${status.toLowerCase().replace(/\s+/g, "-")}`} />
                        <label
                          htmlFor={`status-${status.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Seller Rating</h4>
                  <div className="space-y-2">
                    {["4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating.toLowerCase().replace(/\s+/g, "-")}`} />
                        <label
                          htmlFor={`rating-${rating.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {rating}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <div className="relative flex-1 sm:w-64 md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search auctions..." className="w-full pl-8" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Advanced search</span>
                </Button>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                <Select defaultValue="ending-soon">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="newly-listed">Newly Listed</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {auctions.map((auction) => (
                <Card key={auction.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={auction.image || "/placeholder.svg"}
                        alt={auction.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/30">
                      {auction.category}
                    </Badge>
                    <h3 className="font-semibold line-clamp-1">{auction.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Current Bid</p>
                        <p className="font-semibold">${auction.currentBid}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bids</p>
                        <p className="font-semibold">{auction.bids}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {auction.timeLeft}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/auctions/${auction.id}`} className="w-full" passHref>
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                        Bid Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous page</span>
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
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next page</span>
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
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
