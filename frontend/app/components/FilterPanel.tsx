"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus } from "lucide-react"

const categories = ["Art", "Collectibles", "Electronics", "Fashion", "Jewelry", "Vehicles", "Other"]
const priceRanges = [
  { min: 0, max: 100, label: "Under $100" },
  { min: 100, max: 500, label: "$100 - $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: 5000, label: "$1,000 - $5,000" },
  { min: 5000, max: null, label: "$5,000+" }
]

export default function FilterPanel({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      priceRanges: selectedPriceRanges.map(index => priceRanges[index])
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Category Section */}
      <div className="border-b pb-4">
        <button
          className="w-full flex items-center justify-between py-2"
          onClick={() => toggleSection('category')}
        >
          <span className="text-lg">Category</span>
          {expandedSections.category ? <Minus size={20} /> : <Plus size={20} />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2 mt-2">
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
        )}
      </div>

      {/* Price Section */}
      <div className="border-b pb-4">
        <button
          className="w-full flex items-center justify-between py-2"
          onClick={() => toggleSection('price')}
        >
          <span className="text-lg">Price</span>
          {expandedSections.price ? <Minus size={20} /> : <Plus size={20} />}
        </button>
        {expandedSections.price && (
          <div className="space-y-2 mt-2">
            {priceRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedPriceRanges.includes(index)}
                  onCheckedChange={() => togglePriceRange(index)}
                  id={`price-${index}`}
                />
                <label
                  htmlFor={`price-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
        onClick={handleApply}
      >
        Apply Filters
      </Button>
    </div>
  )
}