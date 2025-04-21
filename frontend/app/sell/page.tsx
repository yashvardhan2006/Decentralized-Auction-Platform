"use client"

import type React from "react"
import { useRef, useState } from "react"
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
  const [selectedCondition, setSelectedCondition] = useState<string>("")
  const [customDuration, setCustomDuration] = useState<string>("7")
  const [formError, setFormError] = useState(false)

  const itemConditionRef = useRef<HTMLDivElement>(null)
  const itemPhotosRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(false)

    if (!selectedCondition) {
      itemConditionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      setFormError(true)
      return
    }

    if (images.length === 0) {
      itemPhotosRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      setFormError(true)
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {/* Form Section */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Item Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide detailed information about the item you are selling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a descriptive title" required />
                </div>

                {/* Category */}
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

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                {/* Item Condition */}
                <div className="space-y-2" ref={itemConditionRef}>
                  <Label>Item Condition</Label>
                  <RadioGroup value={selectedCondition} onValueChange={setSelectedCondition}>
                    {["new", "used-like-new", "used-excellent", "used-good", "used-fair"].map((cond) => (
                      <div key={cond} className="flex items-center space-x-2">
                        <RadioGroupItem value={cond} id={cond} />
                        <Label htmlFor={cond} className="font-normal capitalize">{cond.replace("-", " ")}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formError && !selectedCondition && (
                    <p className="text-sm text-rose-600">Please select the item condition.</p>
                  )}
                </div>

                <Separator />

                {/* Item Photos */}
                <div className="space-y-4" ref={itemPhotosRef}>
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
                          src={image}
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
                          <span className="text-xs font-medium">Upload</span>
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

                  {formError && images.length === 0 && (
                    <p className="text-sm text-rose-600">Please upload at least one photo.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Auction Details */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Pricing & Auction Details</CardTitle>
                <CardDescription>Set your starting price and auction duration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="starting-price">Starting Price ($)</Label>
                  <Input id="starting-price" type="number" min="0.01" step="0.01" placeholder="0.00" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reserve-price">Reserve Price ($) (Optional)</Label>
                  <Input id="reserve-price" type="number" min="0.01" step="0.01" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy-now">Buy Now Price ($) (Optional)</Label>
                  <Input id="buy-now" type="number" min="0.01" step="0.01" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Auction Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter number of days"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-renew" />
                  <Label htmlFor="auto-renew" className="font-normal">
                    Automatically relist if item does not sell
                  </Label>
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
