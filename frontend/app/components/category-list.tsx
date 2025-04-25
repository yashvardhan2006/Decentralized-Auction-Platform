import Link from "next/link"
import { Camera, Car, Cpu, Diamond, Gem, Home, Music, Palette, ShoppingBag, Shirt } from "lucide-react"

const categories = [
  { name: "Art", icon: Palette, href: "/categories/art" },
  { name: "Collectibles", icon: Gem, href: "/categories/collectibles" },
  { name: "Electronics", icon: Cpu, href: "/categories/electronics" },
  { name: "Fashion", icon: Shirt, href: "/categories/fashion" },
  { name: "Jewelry", icon: Diamond, href: "/categories/jewelry" },
  { name: "Vehicles", icon: Car, href: "/categories/vehicles" },
  { name: "Photography", icon: Camera, href: "/categories/photography" },
  { name: "Music", icon: Music, href: "/categories/music" },
  { name: "Real Estate", icon: Home, href: "/categories/real-estate" },
  { name: "Other", icon: ShoppingBag, href: "/categories/other" },
]

export default function CategoryList() {
  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse by Category</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore auctions in your favorite categories.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              <category.icon className="mb-2 h-8 w-8 text-rose-600 dark:text-rose-400" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
