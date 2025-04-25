import { Gavel, Package, Search, UserPlus } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our auction platform is easy to use and secure. Here's how to get started.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900/30">
              <UserPlus className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold">Create Account</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Sign up for free and complete your profile to start bidding or selling.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900/30">
              <Search className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold">Find Items</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Browse categories or search for specific items you're interested in.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900/30">
              <Gavel className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold">Place Bids</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Set your maximum bid and let our system automatically bid for you.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div className="rounded-full bg-rose-100 p-3 dark:bg-rose-900/30">
              <Package className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-bold">Win & Receive</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Pay securely and receive your item directly from the seller.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
