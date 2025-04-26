"use client"
import Link from "next/link"
import Image from "next/image"
import {CheckCircle,CreditCard,Gavel,HelpCircle,MessageSquare,Package,Search,Shield,Star,Truck,UserPlus,} from "lucide-react"
import { useAuth } from "@/app/context/AuthProvider"   
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// export default function HowItWorksPage() {
            
// }
export default function HowItWorksPage() {
    const { user } = useAuth()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-b from-rose-50 to-white py-20 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  How AuctionHub <span className="text-rose-600 dark:text-rose-400">Works</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our auction platform is designed to be simple, secure, and fair for both buyers and sellers. Learn how
                  to get started and make the most of your experience.
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
                  alt="Auction Process Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Step by Step Process */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Auction Process</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Follow these simple steps to start bidding or selling on our platform.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-[#2B144D]"></div>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#4e248a]">
                  <UserPlus className="h-6 w-6 text-purple-300" />
                </div>
                <CardTitle className="text-xl">1. Create an Account</CardTitle>
                <CardDescription>
                  Sign up for free and complete your profile to start bidding or selling.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Quick registration with email or social accounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Verify your identity for secure transactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Set up payment methods for seamless bidding</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-[#2B144D]"></div>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#4e248a]">
                  <Search className="h-6 w-6 text-purple-300" />
                </div>
                <CardTitle className="text-xl">2. Find Items</CardTitle>
                <CardDescription>Browse categories or search for specific items you're interested in.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Explore diverse categories of unique items</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Use advanced filters to narrow your search</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Save searches and get notifications for new listings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-[#2B144D]"></div>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#4e248a]">
                  <Gavel className="h-6 w-6 text-purple-300" />
                </div>
                <CardTitle className="text-xl">3. Place Bids</CardTitle>
                <CardDescription>Set your maximum bid and let our system automatically bid for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Proxy bidding system keeps your maximum bid private</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Get outbid notifications in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Track all your active bids in your dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-[#2B144D]"></div>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#4e248a]">
                  <Package className="h-6 w-6 text-purple-300" />
                </div>
                <CardTitle className="text-xl">4. Win & Receive</CardTitle>
                <CardDescription>Pay securely and receive your item directly from the seller.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Secure payment processing with buyer protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Track shipping with provided tracking numbers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                    <span>Leave feedback after successful transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Buyers and Sellers */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">For Buyers and Sellers</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Learn how our platform benefits both sides of the marketplace.
              </p>
            </div>
          </div>

          <Tabs defaultValue="buyers" className="mt-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="buyers">For Buyers</TabsTrigger>
              <TabsTrigger value="sellers">For Sellers</TabsTrigger>
            </TabsList>
            <TabsContent value="buyers" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a] ">
                      <Shield className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Buyer Protection</CardTitle>
                    <CardDescription>Shop with confidence knowing you're protected.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our buyer protection program ensures you get exactly what you paid for or your money back. All
                      transactions are secured and monitored for your safety.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a]">
                      <Star className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Verified Sellers</CardTitle>
                    <CardDescription>Buy from trusted and rated community members.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All sellers are verified and rated by our community. Check seller ratings and reviews before
                      bidding to ensure a positive experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a]">
                      <CreditCard className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Secure Payments</CardTitle>
                    <CardDescription>Multiple payment options with secure processing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      We offer multiple secure payment methods including credit cards, PayPal, and bank transfers. Your
                      payment information is always encrypted and protected.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sellers" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a]">
                      <Gavel className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Global Reach</CardTitle>
                    <CardDescription>Connect with buyers from around the world.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      List your items to a global audience of potential buyers. Our platform helps you reach interested
                      collectors and enthusiasts worldwide.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a]">
                      <Truck className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Shipping Tools</CardTitle>
                    <CardDescription>Simplified shipping and logistics management.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access discounted shipping rates, print labels directly from your dashboard, and track all your
                      shipments in one place.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4e248a]">
                      <MessageSquare className="h-5 w-5 text-purple-200" />
                    </div>
                    <CardTitle>Seller Support</CardTitle>
                    <CardDescription>Dedicated assistance for all your selling needs.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Our seller support team is available to help with listing optimization, dispute resolution, and
                      any questions you might have along the way.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Find answers to common questions about our auction platform.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I place a bid?</AccordionTrigger>
                <AccordionContent>
                  To place a bid, navigate to the auction listing you're interested in and enter your maximum bid
                  amount. Our system will automatically bid for you up to your maximum amount, increasing your bid only
                  as needed to maintain your position as the highest bidder. You'll receive notifications if you're
                  outbid.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What fees does AuctionHub charge?</AccordionTrigger>
                <AccordionContent>
                  For buyers, there are no fees to register or place bids. For sellers, we charge a listing fee of $0.99
                  for standard listings and a final value fee of 10% of the final sale price. Premium listing options
                  with enhanced visibility are available for an additional fee.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How is shipping handled?</AccordionTrigger>
                <AccordionContent>
                  Shipping is arranged between the buyer and seller after the auction ends. Sellers specify shipping
                  options and costs in their listings. Buyers pay for shipping as part of their final payment. We
                  recommend sellers provide tracking information through our platform for transparency.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What happens if I win an auction?</AccordionTrigger>
                <AccordionContent>
                  If you win an auction, you'll receive a notification and will be directed to complete your purchase by
                  making payment within 3 days. Once payment is confirmed, the seller will be notified to ship your
                  item. You can track the status of your purchase in your dashboard.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How does buyer protection work?</AccordionTrigger>
                <AccordionContent>
                  Our buyer protection program covers eligible purchases if the item you receive is significantly
                  different from the description or doesn't arrive. To qualify, you must report issues within 7 days of
                  receiving the item or within 30 days of payment if the item doesn't arrive. Our team will review your
                  case and may issue a refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I sell internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can sell internationally. As a seller, you can specify which countries you're willing to ship
                  to in your listing settings. You can also set different shipping rates for domestic and international
                  shipping. Be aware of any import/export restrictions for certain items when selling internationally.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">Still have questions? Our support team is here to help.</p>
            <Link href="/contact" passHref>
              <Button className="bg-purple-600 hover:bg-purple-500  ">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1f1247] to-purple-900 py-12 text-white ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start?</h2>
              <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of buyers and sellers today and discover amazing deals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {!user && (
                <Link href="/auth/register" passHref>
                  <Button className="bg-white text-rose-600 hover:bg-gray-100 dark:bg-white dark:text-rose-600 dark:hover:bg-gray-100">
                    Create Account
                  </Button>
                </Link>
              )}
              <Link href="/auctions" passHref>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white/20 dark:border-white dark:text-white dark:hover:bg-white/20"
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
