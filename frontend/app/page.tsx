import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedAuctions from "./components/featured-auctions"
import CategoryList from "./components/category-list"
import HowItWorks from "./components/how-it-works"
import Testimonials from "./components/testimonials"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-rose-50 to-white py-20 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Discover Unique Items at <span className="text-rose-600 dark:text-rose-400">Competitive Prices</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of bidders and sellers on our secure auction platform. Find rare collectibles, art,
                  electronics, and more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auctions" passHref>
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                    Browse Auctions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/register" passHref>
                  <Button variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Auction Items Collage"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find Your Next Treasure
            </h2>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search auctions..."
                  className="w-full bg-white pl-8 dark:bg-gray-950"
                />
              </div>
              <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <FeaturedAuctions />

      {/* Categories */}
      <CategoryList />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-rose-600 py-12 text-white dark:bg-rose-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Bidding?</h2>
              <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of buyers and sellers today and discover amazing deals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register" passHref>
                <Button className="bg-white text-rose-600 hover:bg-gray-100 dark:bg-white dark:text-rose-600 dark:hover:bg-gray-100">
                  Create Account
                </Button>
              </Link>
              <Link href="/auctions" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10"
                >
                  Browse Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
