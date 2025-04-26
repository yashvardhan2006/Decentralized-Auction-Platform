"use client";
import { ethers } from "ethers";
import { AUCTION_ABI, AUCTION_ADDRESS } from "@/app/lib/auction";
import { useWallet } from "@/app/hooks/useWallet"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  DollarSign,
  Eye,
  Heart,
  History,
  Info,
  Share2,
  Shield,
  Tag,
  Truck,
  User,
} from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types
interface ItemImage {
  ipfs_hash: string;
  is_primary: boolean;
}
interface ItemRow {
  item_id: number;
  title: string;
  description: string;
  category: string;
  condition: string;
  start_price: number;
  start_time: string;
  end_time: string;
  reserve_price: number | null;
  buy_now_price: number | null;
  duration_days: number;
  auto_relist: boolean;
  status: string;
  created_by: number;
  item_images: ItemImage[];
}

export default function AuctionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClientComponentClient();
  const [bids, setBids] = useState<{ username: string; amount: number }[]>([]);
  const [bidsCount, setBidsCount] = useState(0);
  const [maxBid, setMaxBid] = useState<number>(0);
  const [item, setItem] = useState<ItemRow | null>(null);
  const [primaryUrl, setPrimaryUrl] = useState<string>("/placeholder.svg");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [isWatching, setIsWatching] = useState(false);
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isBidding, setIsBidding] = useState(false);
  const [bidError, setBidError] = useState<string | null>(null);
  const { account, installed, connectAndSave } = useWallet ? useWallet() : { account: null, installed: false, connectAndSave: async () => {} };

  async function fetchBids() {
    const { data, error } = await supabase
      .from("bids")
      .select("amount, bid_time, users:bidder_id(username)")
      .eq("item_id", Number(params.id))
      .order("bid_time", { ascending: false });
    if (!error && data) {
      setBids(data.map((b: any) => ({
        username: b.users?.username || "Unknown",
        amount: b.amount,
      })));
      setBidsCount(data.length);
      setMaxBid(data.length > 0 ? data[0].amount : item?.start_price || 0);
    }
  }
  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1. get auth user email
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email ?? null;

      // 2. lookup DB user_id
      let myUserId: number | null = null;
      if (email) {
        const { data: profile, error: profErr } = await supabase
          .from("users")
          .select("user_id")
          .eq("email", email)
          .single();
        if (profErr) console.error("profile lookup failed:", profErr);
        else myUserId = profile.user_id;
      }
      setDbUserId(myUserId);

      // 3. fetch item + images
      const { data, error } = await supabase
        .from<ItemRow>("items")
        .select(`*, item_images(ipfs_hash, is_primary)`)
        .eq("item_id", Number(params.id))
        .single();
      if (error || !data) {
        console.error("Error loading item:", error);
        setLoading(false);
        return;
      }
      setItem(data);

      // 4. build URLs
      const urls = data.item_images.map(({ ipfs_hash }) =>
        ipfs_hash.startsWith("http")
          ? ipfs_hash
          : supabase.storage
              .from("image")
              .getPublicUrl(ipfs_hash).data.publicUrl
      );

      // primary
      const primaryIdx = data.item_images.findIndex((i) => i.is_primary);
      const primary = urls[primaryIdx > -1 ? primaryIdx : 0];
      setPrimaryUrl(primary);

      // thumbnails
      setThumbnails(urls.filter((u) => u !== primary));

      // 5. watchlist check
      if (myUserId) {
        const { data: existing, error: wErr } = await supabase
          .from("watchlists")
          .select("*")
          .eq("user_id", myUserId)
          .eq("item_id", data.item_id)
          .single();
        if (wErr && wErr.code !== "PGRST116")
          console.error("watchlist check:", wErr);
        setIsWatching(!!existing);
      }

      setLoading(false);
    }
    load();
  }, [params.id, supabase]);
  useEffect(() => {
    fetchBids();
    const interval = setInterval(fetchBids, 5000);
    return () => clearInterval(interval);
  }, [params.id, supabase]);
  const minBid = maxBid > 0 ? Math.ceil(maxBid + 1) : Math.ceil(item?.start_price * 1.05);
  async function getAuctionOnChain(itemId: number) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const contract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, provider);
    const auction = await contract.auctions(itemId);
    return {
      highestBid: Number(ethers.formatEther(auction.highestBid)),
      highestBidder: auction.highestBidder,
    };
  }
  async function handleBid() {
    setBidError(null);
    if (!installed) {
      setBidError("Please install MetaMask");
      return;
    }
    if (!account) {
      await connectAndSave?.();
      if (!account) {
        setBidError("Wallet not connected");
        return;
      }
    }
    if (!item) return;
    if (!bidAmount || bidAmount < Math.ceil(item.start_price * 1.05)) {
      setBidError("Bid too low");
      return;
    }
    setIsBidding(true);
    try {
      // 1. Get previous highest bidder and bid
      const { highestBid, highestBidder } = await getAuctionOnChain(item.item_id);

      // 2. Place bid on-chain
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, signer);

      const tx = await contract.placeBid(item.item_id, {
        value: ethers.parseEther(bidAmount.toString()),
      });
      await tx.wait();

      // 3. Get user_id from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", user.email)
        .single();

      // 4. Insert bid in bids table
      const { data: bidRow, error: bidErr } = await supabase
        .from("bids")
        .insert({
          item_id: item.item_id,
          bidder_id: profile.user_id,
          amount: bidAmount,
          bid_time: new Date().toISOString(),
        })
        .select("bid_id")
        .single();
      if (bidErr || !bidRow) throw bidErr;
       // 5. Insert escrow transaction for new bid
       await supabase.from("escrow_transactions").insert({
        bid_id: bidRow.bid_id,
        item_id: item.item_id,
        tx_hash: tx.hash,
        from_address: account,
        to_address: AUCTION_ADDRESS,
        amount: bidAmount,
        tx_type: "bid",
        tx_time: new Date().toISOString(),
      });

      // 6. If previous highestBidder exists and is not zero address, record refund
      if (
        highestBidder &&
        highestBidder !== "0x0000000000000000000000000000000000000000" &&
        highestBid > 0
      ) {
        // Record refund in escrow_transactions
        await supabase.from("escrow_transactions").insert({
          bid_id: null,
          item_id: item.item_id,
          tx_hash: tx.hash, // You may want to get the actual refund tx hash if available
          from_address: AUCTION_ADDRESS,
          to_address: highestBidder,
          amount: highestBid,
          tx_type: "refund",
          tx_time: new Date().toISOString(),
        });
      }

      alert("Bid placed!");
      // Optionally reload bids/history here

    } catch (err: any) {
      setBidError(err?.message || "Bid failed");
      console.error("Bid failed:", err);
    } finally {
      setIsBidding(false);
    }
  }
  const toggleWatch = async () => {
    if (!dbUserId || !item) return;

    if (isWatching) {
      const { error } = await supabase
        .from("watchlists")
        .delete()
        .eq("user_id", dbUserId)
        .eq("item_id", item.item_id);
      if (error) console.error("unwatch failed:", error);
      else setIsWatching(false);
    } else {
      const { error } = await supabase
        .from("watchlists")
        .insert({ user_id: dbUserId, item_id: item.item_id });
      if (error) console.error("watch failed:", error);
      else setIsWatching(true);
    }
  };

  if (loading || !item) {
    return <p className="p-8 text-center">Loading auction…</p>;
  }

  // time-left
  const now = Date.now();
  const endMs = new Date(item.end_time).getTime();
  const diff = Math.max(endMs - now, 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const timeLeft = `${days}d ${hours}h ${mins}m`;
  // const bidsCount = 0;
  const watchersCount = 0;  
  const isOwner = dbUserId && item && dbUserId === item.created_by;

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/auctions" className="hover:underline">
            Auctions
          </Link>
          <span>/</span>
          <span>{item.category}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        {/* Left */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-0 mb-4 rounded-2xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={primaryUrl}
                alt={item.title}
                fill
                className="object-cover rounded-2xl"
                unoptimized
                loader={({ src }) => src}
              />
            </div>
          </Card>

          <div className="grid grid-cols-4 gap-2">
            {thumbnails.map((url, i) => (
              <Card
                key={i}
                className="p-0 overflow-hidden cursor-pointer hover:opacity-80"
                onClick={() => setPrimaryUrl(url)}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={url}
                    alt={`${item.title} #${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    loader={({ src }) => src}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Tabs: Description / Shipping / Seller */}
          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Item Description</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium">Item Details</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <Tag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Condition: {item.condition}</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Brand: Example Brand</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                        <span>Year: 1960s</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Features</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Original leather case included</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Manual focus with f/2.8 lens</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Smooth mechanics, clear lens</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Shipping Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Truck className="mr-2" /> Worldwide shipping
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="mr-2" /> Cost: $15
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="seller" className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Seller Info</h3>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Seller #{item.created_by}</p>
                    <p className="text-sm text-gray-500">
                      Member since Jan 2024
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: bidding & watch */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-rose-100 text-rose-800">
                  {item.category}
                </Badge>
                <Button
                  variant={isWatching ? "destructive" : "outline"}
                  onClick={toggleWatch}
                >
                  <Heart className="mr-2" />{" "}
                  {isWatching ? "Unwatch" : "Watch"}
                </Button>
              </div>

              <h1 className="text-2xl font-bold">{item.title}</h1>
              

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Bid:</span>
                  <span className="font-bold text-rose-600">
                    ${maxBid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Next Min Bid:</span>
                  <span>${minBid}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bids:</span>
                  <span className="text-rose-600">{bidsCount} bids</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
  <div className="flex flex-col">
    <label htmlFor="bid-amount" className="text-sm">
      Your Bid
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        Ξ
      </span>
      <Input
        id="bid-amount"
        type="number"
        min={minBid}
        className="pl-7"
        value={bidAmount}
        onChange={e => setBidAmount(Number(e.target.value))}
        disabled={isBidding || !!isOwner}
      />
    </div>
    {bidError && <p className="text-sm text-rose-600">{bidError}</p>}
  </div>
  <Button
    className={`w-full ${isOwner ? "bg-green-600 hover:bg-green-700 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-700"}`}
    onClick={handleBid}
    disabled={isBidding || !!isOwner}
  >
    {isOwner
      ? "Can't bid. ITEM was listed by you"
      : isBidding
        ? "Placing Bid..."
        : "Place Bid"}
  </Button>
  <div className="flex gap-2">
    <Button variant="outline" className="flex-1">
      <Share2 className="mr-2" /> Share
    </Button>
  </div>
</div>

            </CardContent>
          </Card>


          <div id="bid-history" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <History className="mr-2" /> Bid History
            </h3>
            <Card>
              <CardContent>
                {bids.length === 0 ? (
                  <p className="text-sm text-gray-500">No bids yet.</p>
                ) : (
                  <ul className="divide-y">
                    {bids.map((b, i) => (
                      <li
                        key={i}
                        className={`flex justify-between py-2 ${i === 0 ? "text-rose-600 font-bold" : ""}`}
                      >
                        <span>{b.username}</span>
                        <span>
                          ${b.amount}
                          {i === 0 && <span className="ml-2 text-xs">(Highest)</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}