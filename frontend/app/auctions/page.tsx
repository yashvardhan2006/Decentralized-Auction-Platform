"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Search, SlidersHorizontal } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import FilterPanel from "@/app/components/FilterPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 9;

type AuctionRow = {
  item_id: number;
  title: string;
  category: string;
  start_price: number;
  start_time: string;
  end_time: string;
  item_images: { ipfs_hash: string; is_primary: boolean }[];
};

export default function AuctionsPage() {
  const supabase = createClientComponentClient();
  const [auctions, setAuctions] = useState<{
    id: number;
    title: string;
    image: string;
    currentBid: number;
    timeLeft: string;
    bids: number;
    category: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<{ categories: string[] }>({
    categories: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch items + images on mount
  useEffect(() => {
    async function loadAuctions() {
      setLoading(true);
  
      const { data, error } = await supabase
        .from<AuctionRow>("items")
        .select(`
          item_id,
          title,
          category,
          start_price,
          start_time,
          end_time,
          item_images (
            ipfs_hash,
            is_primary
          )
        `);
  
      if (error) {
        console.error("Error loading items:", error);
        setLoading(false);
        return;
      }
  
      const now = Date.now();
      const mapped = data!.map((row) => {
        // Ensure we have an array
        const imagesArray = row.item_images ?? [];
  
        // Pick the primary image or the first one
        const chosen = imagesArray.find((i) => i.is_primary) || imagesArray[0] || null;
  
        // Resolve a valid URL
        let imageUrl = "/placeholder.svg";  // local fallback
        if (chosen) {
          const raw = chosen.ipfs_hash;
          if (raw.startsWith("http")) {
            // Already a public URL
            imageUrl = raw;
          } else {
            // Build via Supabase storage
            const { data: urlData } = supabase
              .storage
              .from("image")
              .getPublicUrl(raw);
            imageUrl = urlData.publicUrl;
          }
        }
  
        // Compute time left
        const endMs = new Date(row.end_time).getTime();
        const diff = Math.max(endMs - now, 0);
        const days = Math.floor(diff / 86_400_000);
        const hours = Math.floor((diff % 86_400_000) / 3_600_000);
        const timeLeft = `${days}d ${hours}h`;
  
        return {
          id: row.item_id,
          title: row.title,
          image: imageUrl,
          currentBid: Number(row.start_price),
          timeLeft,
          bids: 0,          // replace with real bid count if available
          category: row.category,
        };
      });
  
      setAuctions(mapped);
      setLoading(false);
    }
  
    loadAuctions();
  }, [supabase]);
  

  // filter & search
  const filteredAuctions = useMemo(() => {
    return auctions.filter((a) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(a.category);
      const matchesSearch = a.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [auctions, filters, searchQuery]);

  // pagination
  const paginatedAuctions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAuctions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAuctions, currentPage]);
  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading auctions…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-[#2C1352]">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Browse Auctions
          </h1>
          <p className="mt-2 text-gray-500 md:text-xl dark:text-gray-400">
            Discover unique items and place your bids.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <FilterPanel
              onApplyFilters={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Sort */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <div className="relative flex-1 sm:w-64 md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search auctions..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Advanced search</span>
                </Button>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">
                  Sort by:
                </span>
                <Select defaultValue="ending-soon">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="newly-listed">Newly Listed</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Auction Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedAuctions.map((auction) => (
                <Card key={auction.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={auction.image}
                        alt={auction.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/30">
                      {auction.category}
                    </Badge>
                    <h3 className="font-semibold line-clamp-1">
                      {auction.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Current Bid
                        </p>
                        <p className="font-semibold">
                          ${auction.currentBid}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Bids
                        </p>
                        <p className="font-semibold">{auction.bids}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {auction.timeLeft}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/auctions/${auction.id}`} passHref>
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                        Bid Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous page</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className={
                      currentPage === i + 1 ? "bg-rose-600 text-white" : ""
                    }
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next page</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
