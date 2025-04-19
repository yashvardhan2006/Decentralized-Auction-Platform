"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter } from "lucide-react"

const categories = ["Art", "Collectibles", "Electronics", "Fashion", "Jewelry", "Vehicles", "Other"]

export default function FilterPanel({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handleApply = () => {
    onApplyFilters({ categories: selectedCategories })
  }

  const handleReset = () => {
    setSelectedCategories([])
    onApplyFilters({ categories: [] })
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  id={`category-${category}`}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* More filter sections can be added here */}

        <Button
          className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
