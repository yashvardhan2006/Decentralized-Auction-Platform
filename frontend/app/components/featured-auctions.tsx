"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for featured auctions
const featuredAuctions = [
  {
    id: 1,
    title: "Vintage Camera Collection",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 450,
    timeLeft: "2 days, 69 hours",
    bids: 12,
    category: "collectibles",
  },
  {
    id: 2,
    title: "Modern Abstract Painting",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 320,
    timeLeft: "1 day, 3 hours",
    bids: 8,
    category: "art",
  },
  {
    id: 3,
    title: "Antique Wooden Desk",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 750,
    timeLeft: "4 days, 12 hours",
    bids: 15,
    category: "furniture",
  },
  {
    id: 4,
    title: "Limited Edition Watch",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 1200,
    timeLeft: "6 hours",
    bids: 25,
    category: "jewelry",
  },
  {
    id: 5,
    title: "Signed Sports Memorabilia",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 580,
    timeLeft: "3 days, 8 hours",
    bids: 18,
    category: "collectibles",
  },
  {
    id: 6,
    title: "Rare Vinyl Record Collection",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 390,
    timeLeft: "5 days, 2 hours",
    bids: 10,
    category: "collectibles",
  },
  {
    id: 7,
    title: "Designer Handbag",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 850,
    timeLeft: "2 days, 9 hours",
    bids: 22,
    category: "fashion",
  },
  {
    id: 8,
    title: "Gaming Console Bundle",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 520,
    timeLeft: "1 day, 15 hours",
    bids: 14,
    category: "electronics",
  },
]

export default function FeaturedAuctions() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Auctions</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover our most popular and exciting auctions ending soon.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="art">Art</TabsTrigger>
              <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredAuctions.map((auction) => (
                  <Card key={auction.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={auction.image || "/placeholder.svg"}
                          alt={auction.title}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-950/80"
                          onClick={() => toggleFavorite(auction.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(auction.id)
                                ? "fill-rose-500 text-rose-500"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          />
                          <span className="sr-only">Toggle favorite</span>
                        </Button>
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
            </TabsContent>
            <TabsContent value="art" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredAuctions
                  .filter((auction) => auction.category === "art")
                  .map((auction) => (
                    <Card key={auction.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={auction.image || "/placeholder.svg"}
                            alt={auction.title}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-950/80"
                            onClick={() => toggleFavorite(auction.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                favorites.includes(auction.id)
                                  ? "fill-rose-500 text-rose-500"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            />
                            <span className="sr-only">Toggle favorite</span>
                          </Button>
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
            </TabsContent>
            {/* Other tabs would follow the same pattern */}
          </Tabs>
          <div className="mt-8 flex justify-center">
            <Link href="/auctions" passHref>
              <Button variant="outline">View All Auctions</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
