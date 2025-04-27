"use client"
import React, { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ethers } from "ethers"
import { AUCTION_ADDRESS, AUCTION_ABI } from "@/app/lib/auction"
import { useWallet } from "@/app/hooks/useWallet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function SellPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [selectedCondition, setSelectedCondition] = useState<string>("")
  const [customDuration, setCustomDuration] = useState<string>("7")
  const [formError, setFormError] = useState(false)

  const { account, installed, connectAndSave } = useWallet()
  const itemConditionRef = useRef<HTMLDivElement>(null)
  const itemPhotosRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(false)

    // Wallet checks
    if (!installed) {
      alert("Please install MetaMask")
      return
    }
    if (!account) {
      await connectAndSave()
      if (!account) {
        alert("Wallet not connected")
        return
      }
    }

    // Form validations
    if (!selectedCondition) {
      itemConditionRef.current?.scrollIntoView({ behavior: "smooth" })
      setFormError(true)
      return
    }
    if (files.length === 0) {
      itemPhotosRef.current?.scrollIntoView({ behavior: "smooth" })
      setFormError(true)
      return
    }

    setIsSubmitting(true)
    const supabase = createClientComponentClient()

    try {
      // 1️⃣ Authenticate & load profile
      const { data: authData, error: authError } = await supabase.auth.getUser()
      if (authError || !authData.user) throw new Error('Not authenticated')
      const userEmail = authData.user.email

      const { data: profile, error: profError } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', userEmail)
        .single()
      if (profError || !profile) throw new Error('Could not load user profile')
      const createdBy = profile.user_id

      // 2️⃣ On-chain: create auction
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        signer
      )

      const fdMain = new FormData(formRef.current!)
      const title = fdMain.get("title")?.toString() || ""
      const startPrice = parseFloat(
        fdMain.get("starting-price")?.toString() || "0"
      )

      const tx = await contract.createAuction(
        title,
        ethers.parseEther(startPrice.toString())
      );
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      
      // Parse the event properly
      let auctionId: string | null = null;
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog.name === "AuctionCreated") {
            auctionId = parsedLog.args.id.toString();
            break;
          }
        } catch (e) {
          // Ignore logs that do not match
        }
      }
      
      if (!auctionId) {
        throw new Error("Could not get auction ID from contract event");
      }
      

      // 3️⃣ Supabase: insert item record
      const description = fdMain.get("description")?.toString() || ""
      const category = fdMain.get("category")?.toString() || ""
      const reservePrice = fdMain.get("reserve-price")
        ? parseFloat(fdMain.get("reserve-price")!.toString())
        : null
      const buyNowPrice = fdMain.get("buy-now")
        ? parseFloat(fdMain.get("buy-now")!.toString())
        : null
      const durationDays = parseInt(customDuration, 10)
      const autoRelist = fdMain.get("auto-renew") === "on"

      const now = new Date()
      const end = new Date(now.getTime() + durationDays * 86400_000)

      const { data: newItem, error: insertError } = await supabase
        .from("items")
        .insert({
          title,
          description,
          category,
          condition: selectedCondition,
          created_by: createdBy,
          start_price: startPrice,
          // reserve_price: reservePrice,
          // buy_now_price: buyNowPrice,
          // duration_days: durationDays,
          auto_relist: autoRelist,
          // start_time: now.toISOString(),
          // end_time: end.toISOString(),
          auction_id: auctionId,
        })
        .select("item_id")
        .single()
      if (insertError || !newItem) throw insertError
      const itemId = newItem.item_id

      // 4️⃣ Supabase: upload images & metadata
      const uploadPromises = files.map((file, idx) => {
        const path = `items/${itemId}/${Date.now()}-${file.name}`
        return supabase.storage
          .from("image")
          .upload(path, file, { cacheControl: "3600", upsert: false })
          .then(({ data, error }) => {
            if (error) throw error
            const { data: urlData } = supabase.storage
              .from("image")
              .getPublicUrl(data.path)
            return { idx, url: urlData.publicUrl }
          })
      })
      const uploaded = await Promise.all(uploadPromises)
      const metadata = uploaded.map(({ idx, url }) => ({
        item_id: itemId,
        ipfs_hash: url,
        is_primary: idx === 0,
        position: idx + 1,
      }))
      const { error: imagesError } = await supabase
        .from("item_images")
        .insert(metadata)
      if (imagesError) throw imagesError

      // Redirect
      router.replace("/dashboard")

    } catch (err: any) {
      console.error("Error creating listing:", err)
      alert(err.message || "Transaction or upload failed. Please try again.")
      setFormError(true)

    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...newFiles].slice(0, 5))
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 backdrop-blur-[1.5px] z-10 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sell an Item</h1>
        <p className="mt-2 text-gray-500 md:text-xl dark:text-gray-400">
          Create a new auction listing and start selling.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Item Details */}
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide detailed information about the item you are selling.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" placeholder="…" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required name="category">
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
                  <Textarea id="description" name="description" placeholder="Describe your item in detail" className="min-h-[150px]" required />
                </div>

                <div className="space-y-2" ref={itemConditionRef}>
                  <Label>Item Condition</Label>
                  <RadioGroup value={selectedCondition} onValueChange={setSelectedCondition}>
                    {[
                      "new",
                      "used-like-new",
                      "used-excellent",
                      "used-good",
                      "used-fair",
                    ].map(cond => (
                      <div key={cond} className="flex items-center space-x-2">
                        <RadioGroupItem value={cond} id={cond} />
                        <Label htmlFor={cond} className="font-normal capitalize">
                          {cond.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formError && !selectedCondition && (
                    <p className="text-sm text-rose-600">Please select the item condition.</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4" ref={itemPhotosRef}>
                  <h3 className="mb-2 text-lg font-medium">Item Photos</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload at least 1 photo. You can add up to 5. The first image will be your main listing photo.
                  </p>

                  <div className="grid grid-cols-5 gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative aspect-square rounded-md border bg-muted">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Item image ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute right-1 top-1 h-6 w-6 p-0"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    {files.length < 5 && (
                      <div className="flex aspect-square items-center justify-center rounded-md border border-dashed bg-muted">
                        <Label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center justify-center p-4 text-center">
                          <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                          <span className="text-xs font-medium">Upload</span>
                          <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} multiple />
                        </Label>
                      </div>
                    )}
                  </div>

                  {formError && files.length === 0 && (
                    <p className="text-sm text-rose-600">Please upload at least one photo.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Auction Details */}
            <Card className="mt-8 bg-transparent">
              <CardHeader >
                <CardTitle>Pricing & Auction Details</CardTitle>
                <CardDescription>Set your starting price and auction duration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="starting-price">Starting Price ($)</Label>
                  <Input id="starting-price" name="starting-price" type="number" min="0.01" step="0.01" placeholder="0.00" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reserve-price">Reserve Price ($) (Optional)</Label>
                  <Input id="reserve-price" name="reserve-price" type="number" min="0.01" step="0.01" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy-now">Buy Now Price ($) (Optional)</Label>
                  <Input id="buy-now" name="buy-now" type="number" min="0.01" step="0.01" placeholder="0.00" />
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
                    onChange={e => setCustomDuration(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-renew" name="auto-renew" />
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

        {/* Sidebar */}
        <div className="sticky top-20 space-y-6">
          <Card className="bg-transparent">
            <CardHeader >
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
                  Research similar items to set a fair starting price. Lower starting prices often attract more bidders.
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
                Need more help? Visit our{' '}
                <Link href="/help" className="font-medium text-rose-600 hover:underline dark:text-rose-400">
                  Seller Guide
                </Link>.
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-transparent">
            <CardHeader >
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
  )
}