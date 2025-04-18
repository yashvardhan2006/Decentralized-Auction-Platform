import { ArrowUpRight, BarChart3, Settings, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for admin dashboard
const recentAuctions = [
  {
    id: 1,
    title: "Vintage Camera Collection",
    seller: "VintageFinds",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    currentBid: 450,
    endDate: "Apr 22, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Modern Abstract Painting",
    seller: "ArtGallery123",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    currentBid: 320,
    endDate: "Apr 20, 2025",
    status: "active",
  },
  {
    id: 3,
    title: "Antique Wooden Desk",
    seller: "VintageFurniture",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    currentBid: 750,
    endDate: "Apr 25, 2025",
    status: "active",
  },
  {
    id: 4,
    title: "Limited Edition Watch",
    seller: "LuxuryItems",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    currentBid: 1200,
    endDate: "Apr 18, 2025",
    status: "active",
  },
  {
    id: 5,
    title: "Signed Sports Memorabilia",
    seller: "SportsCollector",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    currentBid: 580,
    endDate: "Apr 23, 2025",
    status: "active",
  },
]

const recentUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 15, 2025",
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 14, 2025",
    status: "active",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.r@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 12, 2025",
    status: "active",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 10, 2025",
    status: "active",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.w@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "Apr 8, 2025",
    status: "active",
  },
]

const reportedItems = [
  {
    id: 1,
    title: "Counterfeit Designer Handbag",
    reporter: "FashionExpert",
    reportDate: "Apr 16, 2025",
    reason: "Suspected counterfeit item",
  },
  {
    id: 2,
    title: "Prohibited Substance",
    reporter: "SafetyConcern",
    reportDate: "Apr 15, 2025",
    reason: "Listing violates terms of service",
  },
  {
    id: 3,
    title: "Misleading Description",
    reporter: "HonestBuyer",
    reportDate: "Apr 14, 2025",
    reason: "Item condition misrepresented",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage auctions, users, and platform settings
            </p>
          </div>
          <div className="mt-4 flex space-x-2 md:mt-0">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Moderation Queue
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,685.50</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                +85 new today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,642</div>
              <p className="text-xs text-muted-foreground">
                +124 new this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reported Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Platform revenue for the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Revenue Chart Placeholder</span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">
                  Total Revenue: $24,685.50
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  View Report
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>\
\
