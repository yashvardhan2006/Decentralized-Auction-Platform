"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Camera, Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect would happen here
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a mock implementation - in a real app, you'd handle file uploads
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(() => `/placeholder.svg?height=100&width=100&text=Image`)
      setImages([...images, ...newImages].slice(0, 5))
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sell an Item</h1>
        <p className="mt-2 text-gray-500 md:text-xl dark:text-gray-400">
          Create a new auction listing and start selling.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide detailed information about the item you are selling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a descriptive title" required />
                  <p className="text-xs text-muted-foreground">Be specific and include brand, model, size, etc.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="vehicles">Vehicles</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail"
                    className="min-h-[150px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Include condition, features, history, and any defects or issues.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Item Condition</Label>
                  <RadioGroup defaultValue="used-excellent">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="font-normal">
                        New
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used-like-new" id="used-like-new" />
                      <Label htmlFor="used-like-new" className="font-normal">
                        Used - Like New
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used-excellent" id="used-excellent" />
                      <Label htmlFor="used-excellent" className="font-normal">
                        Used - Excellent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used-good" id="used-good" />
                      <Label htmlFor="used-good" className="font-normal">
                        Used - Good
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used-fair" id="used-fair" />
                      <Label htmlFor="used-fair" className="font-normal">
                        Used - Fair
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Item Photos</h3>
                    <p className="text-sm text-muted-foreground">
                      Add up to 5 photos. The first image will be your main listing photo.
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md border bg-muted">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Item image ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute right-1 top-1 h-6 w-6 p-0"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <div className="flex aspect-square items-center justify-center rounded-md border border-dashed bg-muted">
                        <Label
                          htmlFor="image-upload"
                          className="flex cursor-pointer flex-col items-center justify-center p-4 text-center"
                        >
                          <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                          <span className="text-xs font-medium">Upload Image</span>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageUpload}
                            multiple
                          />
                        </Label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <p className="flex items-center text-sm text-muted-foreground">
                  <Info className="mr-2 h-4 w-4" />
                  High-quality photos increase your chances of selling.
                </p>
              </CardFooter>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Pricing & Auction Details</CardTitle>
                <CardDescription>Set your starting price and auction duration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="starting-price">Starting Price ($)</Label>
                  <Input id="starting-price" type="number" min="0.01" step="0.01" placeholder="0.00" required />
                  <p className="text-xs text-muted-foreground">Set a competitive starting price to attract bidders.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reserve-price">Reserve Price ($) (Optional)</Label>
                  <Input id="reserve-price" type="number" min="0.01" step="0.01" placeholder="0.00" />
                  <p className="text-xs text-muted-foreground">
                    The minimum price you are willing to accept. Item wont sell if bidding does not reach this price.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy-now">Buy Now Price ($) (Optional)</Label>
                  <Input id="buy-now" type="number" min="0.01" step="0.01" placeholder="0.00" />
                  <p className="text-xs text-muted-foreground">Allow buyers to purchase immediately at this price.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Auction Duration</Label>
                  <Select required defaultValue="7">
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="10">10 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-renew" />
                    <Label htmlFor="auto-renew" className="font-normal">
                      Automatically relist if item does not sell
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Shipping & Location</CardTitle>
                <CardDescription>Specify shipping options and your location.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Item Location</Label>
                  <Input id="location" placeholder="City, State/Province, Country" required />
                </div>

                <div className="space-y-2">
                  <Label>Shipping Options</Label>
                  <RadioGroup defaultValue="domestic-international">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="domestic-only" id="domestic-only" />
                      <Label htmlFor="domestic-only" className="font-normal">
                        Domestic Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="domestic-international" id="domestic-international" />
                      <Label htmlFor="domestic-international" className="font-normal">
                        Domestic & International
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local-pickup" id="local-pickup" />
                      <Label htmlFor="local-pickup" className="font-normal">
                        Local Pickup Only
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping-cost">Shipping Cost ($)</Label>
                  <Input id="shipping-cost" type="number" min="0" step="0.01" placeholder="0.00" required />
                  <p className="text-xs text-muted-foreground">Enter 0 for free shipping.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handling-time">Handling Time</Label>
                  <Select required defaultValue="1-2">
                    <SelectTrigger id="handling-time">
                      <SelectValue placeholder="Select handling time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="1-2">1-2 Business Days</SelectItem>
                      <SelectItem value="3-5">3-5 Business Days</SelectItem>
                      <SelectItem value="5-7">5-7 Business Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Time needed to prepare the item for shipping after payment.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  "Create Listing"
                )}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Selling Tips</CardTitle>
                <CardDescription>Maximize your chances of a successful sale.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Quality Photos</h3>
                  <p className="text-sm text-muted-foreground">
                    Take clear, well-lit photos from multiple angles. Include close-ups of any details or defects.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Detailed Description</h3>
                  <p className="text-sm text-muted-foreground">
                    Be honest and thorough. Include dimensions, materials, condition, and any flaws.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Competitive Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Research similar items to set a fair starting price. Lower starting prices often attract more
                    bidders.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Shipping Options</h3>
                  <p className="text-sm text-muted-foreground">
                    Offering free shipping or international shipping can expand your potential buyer pool.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Need more help? Visit our{" "}
                  <Link href="/help" className="font-medium text-rose-600 hover:underline dark:text-rose-400">
                    Seller Guide
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Seller Fees</CardTitle>
                <CardDescription>Understand the costs associated with selling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Listing Fee:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Final Value Fee:</span>
                  <span className="font-medium">10% of final sale price</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Payment Processing:</span>
                  <span className="font-medium">2.9% + $0.30</span>
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground">
                  Fees are deducted automatically when your item sells. You only pay if your item sells.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
