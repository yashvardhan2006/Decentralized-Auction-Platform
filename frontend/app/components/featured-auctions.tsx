"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Heart, ArrowRight } from "lucide-react"

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
    <section className="py-16 bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="inline-block text-5xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Featured Auctions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Discover our most popular and exciting auctions ending soon.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex justify-center   bg-white dark:bg-gray-800  items-center space-x-4 mb-8 mx-auto">
            {[
              { value: "all", label: "All" },
              { value: "art", label: "Art" },
              { value: "collectibles", label: "Collectibles" },
              { value: "electronics", label: "Electronics" },
              { value: "ending-soon", label: "Ending Soon" },
            ].map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={`
        px-6 py-2 text-base font-medium rounded-full transition-colors
        data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300
        data-[state=inactive]:hover:bg-gray-200 dark:data-[state=inactive]:hover:bg-gray-700
        data-[state=active]:bg-rose-600 data-[state=active]:text-white
      `}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>


          {[
            { key: "all", items: featuredAuctions },
            { key: "art", items: featuredAuctions.filter((a) => a.category === "art") },
            {
              key: "collectibles",
              items: featuredAuctions.filter((a) => a.category === "collectibles"),
            },
            {
              key: "electronics",
              items: featuredAuctions.filter((a) => a.category === "electronics"),
            },
            {
              key: "ending-soon",
              items: featuredAuctions.filter((a) => a.timeLeft.includes("hours")),
            },
          ].map(({ key, items }) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((auction) => (
                  <Card
                    key={auction.id}
                    className="overflow-hidden relative z-20 transform transition duration-300
                               hover:scale-105 hover:shadow-2xl cursor-pointer"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-60 w-full">
                        <Image
                          src={auction.image}
                          alt={auction.title}
                          fill
                          className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 ">
                      <Badge className="mb-2 inline-block transform transition
                                         hover:scale-110 bg-rose-100 text-rose-800
                                         dark:bg-rose-900/30 dark:text-rose-300">
                        {auction.category}
                      </Badge>
                      <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">
                        {auction.title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <p>Current Bid</p>
                          <p className="font-semibold">${auction.currentBid}</p>
                        </div>
                        <div className="text-right">
                          <p>Bids</p>
                          <p className="font-semibold">{auction.bids}</p>
                        </div>
                      </div>
                      {/* <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 h-4 w-4" />
                        {auction.timeLeft}
                      </div> */}
                    </CardContent>
                    <CardFooter className="p-2 w-full flex justify-center pt-0">
                      <Link href={`/auctions/${auction.id}`} passHref className="w-full">
                        <Button
                          className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600
                                     dark:hover:bg-rose-700 transition-transform hover:scale-105"
                        >
                          Bid Now
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All */}
        <div className="flex justify-center mt-12">
  <Link href="/auctions" passHref>
    <Button
      variant="outline"
      className="px-12 py-5 text-lg font-bold rounded-full border-2 border-rose-600 text-rose-600 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white dark:hover:from-rose-500 dark:hover:to-purple-600"
    >
      View All Auctions
    </Button>
  </Link>
</div>


      </div>
    </section>
  )
}
