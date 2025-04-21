import Link from "next/link"
import Image from "next/image"
import { Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for categories
const categories = [
  {
    id: "art",
    name: "Art",
    description: "Paintings, prints, sculptures, and other art pieces",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 1245,
  },
  {
    id: "collectibles",
    name: "Collectibles",
    description: "Rare items, memorabilia, and collectible treasures",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 2367,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Gadgets, devices, and electronic equipment",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 1876,
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing, accessories, and vintage apparel",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 3421,
  },
  {
    id: "jewelry",
    name: "Jewelry",
    description: "Fine jewelry, watches, and precious gems",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 1532,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, motorcycles, boats, and other vehicles",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 876,
  },
  {
    id: "photography",
    name: "Photography",
    description: "Cameras, equipment, and vintage photographs",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 945,
  },
  {
    id: "music",
    name: "Music",
    description: "Instruments, vinyl records, and music memorabilia",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 1678,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Properties, land, and real estate opportunities",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 432,
  },
  {
    id: "other",
    name: "Other",
    description: "Unique items that don't fit other categories",
    image: "/placeholder.svg?height=300&width=600",
    itemCount: 987,
  },
]

// Mock data for featured items in each category
const featuredItems = [
  {
    id: 1,
    title: "Abstract Oil Painting by Modern Artist",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 450,
    timeLeft: "2 days, 5 hours",
    category: "art",
  },
  {
    id: 2,
    title: "Rare Vintage Comic Book Collection",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 320,
    timeLeft: "1 day, 3 hours",
    category: "collectibles",
  },
  {
    id: 3,
    title: "Premium Noise-Cancelling Headphones",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 180,
    timeLeft: "4 days, 12 hours",
    category: "electronics",
  },
  {
    id: 4,
    title: "Designer Handbag - Limited Edition",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 750,
    timeLeft: "3 days, 8 hours",
    category: "fashion",
  },
  {
    id: 5,
    title: "Vintage Diamond Engagement Ring",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 1200,
    timeLeft: "6 hours",
    category: "jewelry",
  },
  {
    id: 6,
    title: "Classic Convertible Sports Car",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 15000,
    timeLeft: "5 days, 2 hours",
    category: "vehicles",
  },
  {
    id: 7,
    title: "Professional DSLR Camera with Lenses",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 890,
    timeLeft: "2 days, 9 hours",
    category: "photography",
  },
  {
    id: 8,
    title: "Vintage Vinyl Record Collection",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 390,
    timeLeft: "1 day, 15 hours",
    category: "music",
  },
  {
    id: 9,
    title: "Beachfront Property with Ocean Views",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 450000,
    timeLeft: "7 days, 12 hours",
    category: "real-estate",
  },
  {
    id: 10,
    title: "Unique Handcrafted Wooden Sculpture",
    image: "/placeholder.svg?height=200&width=300",
    currentBid: 275,
    timeLeft: "3 days, 4 hours",
    category: "other",
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Categories</h1>
          <p className="mt-2 text-gray-500 md:text-xl dark:text-gray-400">
            Browse auctions by category to find exactly what you're looking for.
          </p>
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
                    {["All Auctions", "Ending Soon", "New Listings", "Most Bids"].map((status) => (
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
                  <h4 className="font-medium text-sm">Item Condition</h4>
                  <div className="space-y-2">
                    {["New", "Used - Like New", "Used - Good", "Used - Fair"].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={`condition-${condition.toLowerCase().replace(/\s+/g, "-")}`} />
                        <label
                          htmlFor={`condition-${condition.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {condition}
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
                  <Input type="search" placeholder="Search categories..." className="w-full pl-8" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Advanced search</span>
                </Button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link href={`/categories/${category.id}`} key={category.id} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                            {category.itemCount} items
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                        Browse Category
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Items Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-6">Featured Items by Category</h2>

          <Tabs defaultValue="art" className="w-full">
            <TabsList className="flex flex-wrap h-auto mb-8 justify-start">
              {categories.slice(0, 6).map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="mb-2">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.slice(0, 6).map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredItems
                    .filter((item) => item.category === category.id)
                    .map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                          <div className="relative h-48 w-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/30">
                            {category.name}
                          </Badge>
                          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Current Bid</p>
                              <p className="font-semibold">${item.currentBid.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
                              <p className="font-semibold">{item.timeLeft}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Link href={`/auctions/${item.id}`} className="w-full" passHref>
                            <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                              Bid Now
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Link href={`/categories/${category.id}`} passHref>
                    <Button variant="outline">View All {category.name} Items</Button>
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
