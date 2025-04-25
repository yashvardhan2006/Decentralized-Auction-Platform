// app/auctions/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  DollarSign,
  Eye,
  Heart,
  History,
  Share2,
  Shield,
  Tag,
  Truck,
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

type ItemImage = { ipfs_hash: string; is_primary: boolean; };
type ItemRow = {
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
};

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();

  const [item, setItem] = useState<ItemRow | null>(null);
  const [primaryUrl, setPrimaryUrl] = useState<string>("/placeholder.svg");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // watchlist
  const [isWatching, setIsWatching] = useState(false);
  const [dbUserId, setDbUserId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // 1) get auth user email
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email ?? null;

      // 2) lookup integer user_id from users table
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

      // 3) fetch item + images
      const { data, error } = await supabase
        .from<ItemRow>("items")
        .select(`
          item_id,
          title,
          description,
          category,
          condition,
          start_price,
          start_time,
          end_time,
          reserve_price,
          buy_now_price,
          duration_days,
          auto_relist,
          status,
          created_by,
          item_images (
            ipfs_hash,
            is_primary
          )
        `)
        .eq("item_id", Number(params.id))
        .single();

      if (error || !data) {
        console.error("Error loading item:", error);
        setLoading(false);
        return;
      }
      setItem(data);

      // 4) build public URLs (skip if already http)
      const urls = data.item_images.map(({ ipfs_hash }) =>
        ipfs_hash.startsWith("http")
          ? ipfs_hash
          : supabase.storage.from("image").getPublicUrl(ipfs_hash).data.publicUrl
      );

      // find primary
      const primaryIdx = data.item_images.findIndex((i) => i.is_primary);
      const primary = urls[primaryIdx > -1 ? primaryIdx : 0];
      setPrimaryUrl(primary);

      // gallery has all including primary (or filter out if you prefer)
      setGalleryUrls(urls);

      // 5) check watchlist row
      if (myUserId) {
        const { data: existing, error: wErr } = await supabase
          .from("watchlists")
          .select("*")
          .eq("user_id", myUserId)
          .eq("item_id", data.item_id)
          .single();
        if (wErr && wErr.code !== "PGRST116") console.error("watchlist check:", wErr);
        setIsWatching(!!existing);
      }

      setLoading(false);
    }
    load();
  }, [params.id, supabase]);

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

  // time-left calc
  const now = Date.now();
  const endMs = new Date(item.end_time).getTime();
  const diff = Math.max(endMs - now, 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const timeLeft = `${days}d ${hours}h ${mins}m`;

  const bidsCount = 0;
  const watchersCount = 0;

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/auctions" className="hover:underline">Auctions</Link>
          <span>/</span>
          <span>{item.category}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        {/* Left: images & gallery */}
        <div className="lg:col-span-3  ">
          <Card className="p-0 my-2 rounded-2xl ">
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
            {galleryUrls
              // omit primary from thumbnails
              .filter((u) => u !== primaryUrl)
              .map((url, i) => (
                <Card key={i} className="p-0 overflow-hidden cursor-pointer" onClick={() => setPrimaryUrl(url)}>
                  <div className="relative aspect-square w-full">
                    <Image src={url} alt={`${item.title} #${i+1}`} fill className="object-cover" unoptimized loader={({ src }) => src} />
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Right: details & bidding & watch */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-rose-100 text-rose-800">{item.category}</Badge>
                <Button variant={isWatching ? "destructive" : "outline"} onClick={toggleWatch}>
                  <Heart className="mr-2" /> {isWatching ? "Unwatch" : "Watch"}
                </Button>
              </div>

              <h1 className="text-2xl font-bold">{item.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="mr-1" /> {watchersCount} watching
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Bid:</span>
                  <span className="font-bold text-rose-600">${item.start_price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Min Bid:</span>
                  <span>${Math.ceil(item.start_price * 1.05)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bids:</span>
                  <Link href="#bid-history" className="text-rose-600 hover:underline">
                    {bidsCount} bids
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Time Left:</span>
                  <span className="text-rose-600">{timeLeft}</span>
                </div>
                <Progress value={(days / item.duration_days) * 100} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="bid-amount" className="text-sm">Your Bid</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">Ξ</span>
                    <Input id="bid-amount" type="number" min={Math.ceil(item.start_price * 1.05)} className="pl-7" />
                  </div>
                </div>
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Place Bid</Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1"><Share2 className="mr-2" />Share</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div id="bid-history" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center"><History className="mr-2" /> Bid History</h3>
            <Card>
              <CardContent><p className="text-sm text-gray-500">No bids yet.</p></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
