import Link from "next/link"
import Image from "next/image"
import { ArrowRight, HelpCircle, Mail, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-b from-rose-50 to-white py-20 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Frequently Asked <span className="text-rose-600 dark:text-rose-400">Questions</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find answers to common questions about our decentralized auction platform, blockchain-powered bidding
                  process, and wallet-based payments.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact" passHref>
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700">
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auctions" passHref>
                  <Button variant="outline">Browse Auctions</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="FAQ Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How can we help you?
            </h2>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="w-full bg-white pl-8 dark:bg-gray-950"
                />
              </div>
              <Button className="bg-purple-900 hover:bg-purple-800 hover:cursor-pointer">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="bidding">Bidding</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="selling">Selling</TabsTrigger>
              {/* <TabsTrigger value="security">Security</TabsTrigger> */}
            </TabsList>

            {/* General FAQs */}
            <TabsContent value="general" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general-1">
                    <AccordionTrigger>What is AuctionHub?</AccordionTrigger>
                    <AccordionContent>
                      AuctionHub is an online auction platform where users can buy and sell a wide variety of items
                      through a bidding system. We connect buyers with unique items and sellers with interested
                      customers. Our platform handles everything from listing to payment processing, making the auction
                      experience seamless and secure.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="general-2">
                    <AccordionTrigger>How does an online auction work?</AccordionTrigger>
                    <AccordionContent>
                      Online auctions work similarly to traditional auctions but take place entirely online. Sellers
                      list items with a starting price and auction duration. Buyers place bids on items they're
                      interested in, and the highest bidder at the end of the auction wins the item. Our system uses
                      proxy bidding, which means you set your maximum bid and our system automatically bids
                      incrementally on your behalf up to your maximum amount.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="general-3">
                    <AccordionTrigger>What types of items can be sold on AuctionHub?</AccordionTrigger>
                    <AccordionContent>
                      AuctionHub supports a wide range of categories including art, collectibles, electronics, fashion,
                      jewelry, vehicles, photography equipment, musical instruments, and more. However, we prohibit the
                      sale of illegal items, counterfeit goods, hazardous materials, and other restricted items as
                      outlined in our Terms of Service.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="general-4">
                    <AccordionTrigger>Is AuctionHub available internationally?</AccordionTrigger>
                    <AccordionContent>
                      Yes, AuctionHub is available to users worldwide. You can register and participate in auctions from
                      any country. However, sellers can specify their shipping preferences and may choose to ship only
                      domestically or to select countries. International buyers should be aware of potential import
                      duties, taxes, and shipping restrictions that may apply to their purchases.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="general-5">
                    <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
                    <AccordionContent>
                      You can contact our customer support team through several channels:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Email us at support@auctionhub.com</li>
                        <li>Use the contact form on our Contact page</li>
                        <li>Live chat available Monday-Friday, 9am-5pm EST</li>
                        <li>Call our support line at 1-800-AUCTION (1-800-282-8466)</li>
                      </ul>
                      Our support team typically responds within 24 hours during business days.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Blockchain FAQs */}
            <TabsContent value="blockchain" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="blockchain-1">
                    <AccordionTrigger>What makes AuctionHub a decentralized platform?</AccordionTrigger>
                    <AccordionContent>
                      AuctionHub is built on blockchain technology, which means transactions are processed on a
                      decentralized network rather than through traditional centralized payment processors. This
                      provides greater security, transparency, and lower fees. All bids, sales, and payments are
                      recorded on the blockchain, creating an immutable record of ownership and transaction history that
                      can't be altered or deleted.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blockchain-2">
                    <AccordionTrigger>What wallets are supported for payments?</AccordionTrigger>
                    <AccordionContent>
                      We support a wide range of cryptocurrency wallets including MetaMask, Trust Wallet, Coinbase
                      Wallet, WalletConnect-compatible wallets, and more. You can connect your preferred wallet to your
                      account in the settings page. We currently support transactions in major cryptocurrencies
                      including ETH, BTC, USDC, and our native AuctionToken (AUT).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blockchain-3">
                    <AccordionTrigger>How do I connect my wallet to AuctionHub?</AccordionTrigger>
                    <AccordionContent>
                      To connect your wallet:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Log in to your AuctionHub account</li>
                        <li>Go to "Account Settings" and select "Wallet Connections"</li>
                        <li>Click "Connect Wallet" and choose your preferred wallet provider</li>
                        <li>Follow the prompts in your wallet application to authorize the connection</li>
                        <li>Once connected, your wallet address will appear in your profile</li>
                      </ol>
                      You can connect multiple wallets to your account and choose which one to use for each transaction.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blockchain-4">
                    <AccordionTrigger>Are there gas fees for transactions?</AccordionTrigger>
                    <AccordionContent>
                      Yes, as with any blockchain transaction, there are gas fees that vary depending on network
                      congestion and the blockchain you're using. AuctionHub uses layer-2 solutions to minimize these
                      fees whenever possible. When placing a bid or making a purchase, you'll see the estimated gas fee
                      before confirming the transaction. We also batch certain operations to reduce the overall gas
                      costs for our users.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blockchain-5">
                    <AccordionTrigger>What are the benefits of a decentralized auction platform?</AccordionTrigger>
                    <AccordionContent>
                      Decentralized auctions offer several advantages:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Transparency: All bids and transactions are recorded on the blockchain and publicly verifiable
                        </li>
                        <li>
                          Security: Reduced risk of fraud through smart contracts that automatically enforce auction
                          rules
                        </li>
                        <li>Lower fees: Elimination of traditional payment processors means lower transaction costs</li>
                        <li>
                          Global access: Anyone with a crypto wallet can participate, regardless of banking access
                        </li>
                        <li>Privacy: Participate in auctions without sharing personal banking information</li>
                        <li>Ownership verification: Clear provenance tracking for digital and physical items</li>
                        <li>Programmable escrow: Funds are only released when conditions are met</li>
                      </ul>
                      These features create a more trustworthy marketplace for both buyers and sellers.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Account FAQs */}
            <TabsContent value="account" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="account-1">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      Creating an account is simple and free. Click the "Register" button in the top right corner of the
                      page, then fill out the registration form with your name, email address, and password. You can
                      also sign up using your Google or Facebook account for faster registration. After registering,
                      you'll need to verify your email address before you can start bidding or selling.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="account-2">
                    <AccordionTrigger>Can I change my username or email address?</AccordionTrigger>
                    <AccordionContent>
                      You can change your email address in your account settings, but you'll need to verify the new
                      email address before the change takes effect. Usernames cannot be changed once your account is
                      created to maintain transaction history integrity. If you absolutely need to change your username,
                      please contact customer support for assistance.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="account-3">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      If you've forgotten your password, click the "Login" button, then select "Forgot password?" on the
                      login page. Enter the email address associated with your account, and we'll send you a password
                      reset link. The link is valid for 24 hours. If you don't receive the email, check your spam folder
                      or contact customer support.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="account-4">
                    <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                    <AccordionContent>
                      To delete your account, go to your account settings and select the "Delete Account" option at the
                      bottom of the page. Please note that account deletion is permanent and cannot be undone. All your
                      personal information will be removed, but transaction records will be maintained for legal and
                      accounting purposes. You cannot delete an account with active listings or ongoing transactions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="account-5">
                    <AccordionTrigger>What information is shown on my public profile?</AccordionTrigger>
                    <AccordionContent>
                      Your public profile displays your username, member since date, feedback rating, number of
                      completed transactions, and any active listings you have. Your full name, email address, payment
                      information, and other personal details are never publicly visible. You can customize your profile
                      by adding an optional bio, profile picture, and location (city/state or country only).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Bidding FAQs */}
            <TabsContent value="bidding" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="bidding-1">
                    <AccordionTrigger>How do I place a bid?</AccordionTrigger>
                    <AccordionContent>
                      To place a bid, navigate to the auction listing you're interested in and enter your maximum bid
                      amount in the bidding box. Click "Place Bid" to confirm. Our system uses proxy bidding, which
                      means we'll automatically increase your bid as needed up to your maximum amount to keep you as the
                      highest bidder. You'll receive notifications if you're outbid.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bidding-2">
                    <AccordionTrigger>What is proxy bidding?</AccordionTrigger>
                    <AccordionContent>
                      Proxy bidding is an automated bidding system where you set your maximum bid amount, but the system
                      only bids as much as necessary to outbid other users. For example, if the current bid is $50 and
                      you set your maximum at $100, the system might place a bid of $55 on your behalf. If someone else
                      bids $60, the system will automatically bid $65 for you, and so on, up to your $100 maximum. This
                      way, you don't have to constantly monitor the auction.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bidding-3">
                    <AccordionTrigger>Can I cancel a bid?</AccordionTrigger>
                    <AccordionContent>
                      In general, bids cannot be canceled once placed. This policy ensures the integrity of our auction
                      process. However, in exceptional circumstances (such as an obvious typographical error in the
                      listing description or item details), you may request a bid cancellation by contacting customer
                      support immediately. Bid cancellations are reviewed on a case-by-case basis and are not
                      guaranteed.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bidding-4">
                    <AccordionTrigger>What happens if I win an auction?</AccordionTrigger>
                    <AccordionContent>
                      When you win an auction, you'll receive a notification via email and in your account dashboard.
                      You are obligated to complete the purchase by making payment within 3 days. After payment is
                      confirmed, the seller will be notified to ship your item. You can track the status of your
                      purchase in your dashboard. Once you receive the item, you should mark it as received and leave
                      feedback for the seller.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bidding-5">
                    <AccordionTrigger>What is "Buy Now" and how does it work?</AccordionTrigger>
                    <AccordionContent>
                      "Buy Now" is an option that sellers may offer, allowing buyers to purchase an item immediately at
                      a fixed price without waiting for the auction to end. If a listing has a "Buy Now" option, you'll
                      see a "Buy Now" button alongside the bidding option. Clicking this button will immediately end the
                      auction and award you the item at the stated price. Once you choose "Buy Now," the transaction
                      cannot be canceled.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Payment FAQs */}
            <TabsContent value="payment" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment-1">
                    <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                    <AccordionContent>
                      As a decentralized platform, AuctionHub uses cryptocurrency wallets for all transactions. We
                      currently support major cryptocurrencies including ETH, BTC, USDC, and our native AuctionToken
                      (AUT). You'll need to connect a compatible wallet such as MetaMask, Trust Wallet, or Coinbase
                      Wallet to your account. All transactions are processed on the blockchain, providing security,
                      transparency, and lower fees compared to traditional payment methods.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment-2">
                    <AccordionTrigger>How does shipping work?</AccordionTrigger>
                    <AccordionContent>
                      Shipping is arranged between the buyer and seller after the auction ends. Sellers specify shipping
                      options and costs in their listings. As a buyer, you pay for shipping as part of your final
                      payment. Sellers are required to ship items within 3 business days of receiving payment and
                      provide tracking information through our platform. International shipping may involve additional
                      customs fees and import taxes, which are the buyer's responsibility.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment-3">
                    <AccordionTrigger>What fees does AuctionHub charge?</AccordionTrigger>
                    <AccordionContent>
                      As a decentralized platform, our fee structure is transparent and lower than traditional auction
                      sites:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          Listing Fee: Free for standard listings, 0.001 ETH (or equivalent) for featured listings
                        </li>
                        <li>Final Value Fee: 5% of the final sale price (half the industry standard)</li>
                        <li>
                          Network Gas Fees: Variable based on blockchain congestion (we use layer-2 solutions to
                          minimize these)
                        </li>
                      </ul>
                      All fees are automatically calculated and processed through smart contracts. There are no hidden
                      charges, and our fee structure is encoded in the blockchain for complete transparency.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment-4">
                    <AccordionTrigger>How does buyer protection work?</AccordionTrigger>
                    <AccordionContent>
                      Our buyer protection program is built on smart contracts that automatically enforce transaction
                      rules. When you make a purchase, funds are held in an escrow smart contract until you confirm
                      receipt of the item in the specified condition. If there's a dispute, our decentralized
                      arbitration process allows community validators to review evidence and determine the outcome. This
                      system provides protection without requiring trust in a central authority, as the smart contract
                      automatically executes the decision once consensus is reached.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment-5">
                    <AccordionTrigger>What if I don't receive my item or it's not as described?</AccordionTrigger>
                    <AccordionContent>
                      If you don't receive your item or it's significantly different from the description, follow these
                      steps:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Contact the seller directly through our messaging system first</li>
                        <li>If you can't resolve the issue with the seller, open a dispute in your dashboard</li>
                        <li>Provide evidence such as photos and a detailed explanation</li>
                        <li>Our support team will review the case and mediate</li>
                        <li>If your claim is valid, you'll receive a refund through your original payment method</li>
                      </ol>
                      Most disputes are resolved within 5-7 business days.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Selling FAQs */}
            <TabsContent value="selling" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="selling-1">
                    <AccordionTrigger>How do I list an item for auction?</AccordionTrigger>
                    <AccordionContent>
                      To list an item, click the "Sell" button in the navigation menu. You'll need to:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Upload clear photos of your item (up to 10 images)</li>
                        <li>Write a detailed title and description</li>
                        <li>Select the appropriate category</li>
                        <li>Set a starting price and auction duration</li>
                        <li>Specify shipping options and costs</li>
                        <li>Add optional features like reserve price or Buy Now option</li>
                        <li>Review and publish your listing</li>
                      </ol>
                      High-quality photos and detailed descriptions increase your chances of a successful sale.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="selling-2">
                    <AccordionTrigger>What should I include in my item description?</AccordionTrigger>
                    <AccordionContent>
                      A good item description should include:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Detailed specifications (dimensions, weight, materials, etc.)</li>
                        <li>Age and condition of the item</li>
                        <li>Brand, model, and serial number (if applicable)</li>
                        <li>Any flaws, defects, or signs of wear</li>
                        <li>Provenance or history for collectibles or antiques</li>
                        <li>Original packaging or accessories included</li>
                        <li>Warranty information (if applicable)</li>
                      </ul>
                      Be honest and thorough to avoid returns and negative feedback. Use bullet points for readability.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="selling-3">
                    <AccordionTrigger>What is a reserve price?</AccordionTrigger>
                    <AccordionContent>
                      A reserve price is the minimum amount you're willing to sell your item for. It's hidden from
                      bidders, who only see that a reserve price exists. If the bidding doesn't reach your reserve
                      price, you're not obligated to sell the item. Setting a reserve price incurs an additional fee of
                      $2 or 1% of the reserve amount (whichever is greater). We recommend using reserve prices
                      sparingly, as they can discourage bidding.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="selling-4">
                    <AccordionTrigger>How do I get paid for items I sell?</AccordionTrigger>
                    <AccordionContent>
                      After a successful sale and the buyer's payment is confirmed, the funds (minus our fees) are held
                      in your AuctionHub account. You can withdraw funds to your linked bank account or PayPal account
                      from your dashboard. Standard transfers typically take 2-3 business days to process. For new
                      sellers, there may be a 7-day holding period for your first few sales as a security measure.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="selling-5">
                    <AccordionTrigger>What if the buyer doesn't pay?</AccordionTrigger>
                    <AccordionContent>
                      If a buyer doesn't pay within 3 days, you can:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Send a payment reminder through our messaging system</li>
                        <li>Open an unpaid item case after 4 days</li>
                        <li>
                          If the buyer still doesn't pay, you can cancel the transaction after 7 days and relist the
                          item
                        </li>
                      </ol>
                      Buyers who repeatedly fail to pay may have their accounts restricted or suspended. You won't be
                      charged final value fees for unpaid item cases that are resolved in your favor.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Security FAQs */}
            <TabsContent value="security" className="mt-0">
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="security-1">
                    <AccordionTrigger>How does AuctionHub keep my information secure?</AccordionTrigger>
                    <AccordionContent>
                      We employ multiple security measures to protect your information:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>SSL encryption for all data transmission</li>
                        <li>Two-factor authentication for account access</li>
                        <li>PCI DSS compliance for payment processing</li>
                        <li>Regular security audits and penetration testing</li>
                        <li>Encrypted storage of sensitive information</li>
                      </ul>
                      We never store complete credit card information on our servers and use tokenization for payment
                      processing. Our privacy policy details how we collect, use, and protect your information.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security-2">
                    <AccordionTrigger>How can I spot and avoid scams?</AccordionTrigger>
                    <AccordionContent>
                      To avoid scams, watch for these red flags:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Requests to complete transactions outside of AuctionHub</li>
                        <li>Sellers with new accounts and no feedback selling high-value items</li>
                        <li>Prices that seem too good to be true</li>
                        <li>Poor quality or stock photos used in listings</li>
                        <li>Requests for unusual payment methods (wire transfers, gift cards, etc.)</li>
                        <li>Pressure to make quick decisions</li>
                      </ul>
                      Always conduct transactions through our platform to ensure buyer protection. Report suspicious
                      activity to our support team immediately.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security-3">
                    <AccordionTrigger>What is the feedback system?</AccordionTrigger>
                    <AccordionContent>
                      Our feedback system allows buyers and sellers to rate each other after completed transactions.
                      Ratings are on a 1-5 star scale, with written reviews optional. Feedback helps build trust in our
                      community and helps users make informed decisions. You cannot remove feedback once it's posted,
                      but you can respond to feedback you've received. Fraudulent or abusive feedback may be removed by
                      our moderation team upon review.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security-4">
                    <AccordionTrigger>How do I report suspicious activity?</AccordionTrigger>
                    <AccordionContent>
                      If you encounter suspicious activity:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>
                          Use the "Report Item" button on any listing or the "Report User" option on user profiles
                        </li>
                        <li>Select the appropriate reason for reporting</li>
                        <li>Provide as much detail as possible</li>
                        <li>For urgent concerns, contact our Trust & Safety team directly at trust@auctionhub.com</li>
                      </ol>
                      Our moderation team reviews all reports and takes appropriate action, which may include removing
                      listings, suspending accounts, or involving law enforcement when necessary.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security-5">
                    <AccordionTrigger>What should I do if I think my account has been compromised?</AccordionTrigger>
                    <AccordionContent>
                      If you suspect your account has been compromised:
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Change your password immediately</li>
                        <li>Enable two-factor authentication if not already active</li>
                        <li>
                          Contact our support team at security@auctionhub.com with the subject "Compromised Account"
                        </li>
                        <li>Review your account activity for unauthorized bids, listings, or changes</li>
                        <li>Check your email for notifications about account changes you didn't make</li>
                      </ol>
                      We can help secure your account, reverse unauthorized transactions, and investigate the breach.
                      Report compromised accounts as soon as possible to minimize potential damage.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Popular Questions</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Quick answers to our most frequently asked questions.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>How do I place a bid?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Navigate to the auction listing, enter your maximum bid amount, and click "Place Bid." Our system will
                  automatically bid for you up to your maximum amount, increasing your bid only as needed to maintain
                  your position as the highest bidder.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens if I win an auction?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you win, you'll receive a notification and will be directed to complete your purchase by making
                  payment within 3 days. Once payment is confirmed, the seller will ship your item. You can track the
                  status in your dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I list an item for sale?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Click the "Sell" button, upload photos, write a detailed description, select a category, set your
                  starting price and auction duration, specify shipping options, an set your starting price and auction
                  duration, specify shipping options, and review your listing before publishing. High-quality photos and
                  detailed descriptions increase your chances of a successful sale.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What fees does AuctionHub charge?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For buyers, there are no fees to register or place bids. For sellers, we charge a listing fee of $0.99
                  for standard listings and a final value fee of 10% of the final sale price. Payment processing fees of
                  2.9% + $0.30 per transaction also apply.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How does buyer protection work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our buyer protection program covers eligible purchases if the item you receive is significantly
                  different from the description or doesn't arrive. To qualify, report issues within 7 days of receiving
                  the item or within 30 days if the item doesn't arrive.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I cancel a bid?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In general, bids cannot be canceled once placed. However, in exceptional circumstances (such as an
                  obvious error in the listing description), you may request a bid cancellation by contacting customer
                  support immediately.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How do I pay with my crypto wallet?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After connecting your wallet in account settings, simply place a bid or use Buy Now on an item. You'll
                  receive a prompt in your wallet app to confirm the transaction. The funds will be held in a secure
                  smart contract until the auction ends or the transaction is completed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
              <div className="flex flex-col items-center text-center">
                <HelpCircle className="h-12 w-12 text-[]" />
                <h3 className="mt-4 text-2xl font-bold">Still have questions?</h3>
                <p className="mt-2 text-muted-foreground">
                  Our support team is here to help. Contact us and we'll get back to you as soon as possible.
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Button className="bg-purple-950 hover:bg-purple-900 hover:cursor-pointer text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-950 to-purple-1000 bg- py-12 text-white ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Join the Decentralized Auction Revolution?
              </h2>
              <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of buyers and sellers today and discover amazing deals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register" passHref>
                <Button className="bg-white text-rose-600 hover:bg-gray-100 dark:bg-white dark:text-rose-600 dark:hover:bg-gray-100">
                  Create Account
                </Button>
              </Link>
              <Link href="/auctions" passHref>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10"
                >
                  Browse Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
