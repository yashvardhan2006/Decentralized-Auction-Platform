## Decentralized Auction Platform

### Team Members

- Sameer Chaudhary (230001070)
- Yash Vardhan Solanki (230005052)
- Yash Vijay Kumbhkarn (230001083)
- Vansh Khandelwal (230041038)
- Vasav Jain (230001081)
- Vikrant (230001083)

---

## Resources

- [**Report**](https://www.canva.com/design/DAGlrufT-pw/B-WQFOZtnp6_n-tkm4tHbg/edit?utm_content=DAGlrufT-pw\&utm_campaign=designshare\&utm_medium=link2\&utm_source=sharebutton)
- [**Demo Video**](https://drive.google.com/file/d/1NsnRB2DzAz5LpnkH0zC1bKiLG-1feSoc/view?usp=sharing)

---

A blockchain-powered auction platform allowing users to create and participate in decentralized auctions with transparency, low fees, and secure wallet integration.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Technologies](#technologies)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
   - [Backend](#1-backend)
   - [Frontend](#2-frontend)
6. [Usage](#usage)
   - [Backend Commands](#backend-commands)
   - [Frontend Usage](#frontend-usage)

## Features

- Create and manage auctions on Ethereum via smart contracts
- Place bids in ETH with real-time updates
- End auctions and distribute funds securely
- Next.js frontend with MetaMask wallet integration
- Supabase authentication for user accounts and profiles
- Responsive design with custom components and 3D graphics

## Architecture

This project is split into two main parts:

1. **Backend (Smart Contracts)**: Implemented in Solidity and managed with Truffle. Contains the `AuctionSystem` contract for creating auctions, bidding, and ending auctions.
2. **Frontend (Web App)**: Built with Next.js and React. Integrates with Ethereum via Ethers.js and Web3.js, and uses Supabase for user authentication.

## Technologies

- **Blockchain**: Solidity, Truffle, Ganache
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Supabase (Auth & Database)
- **Wallet Integration**: Ethers.js, Web3.js, MetaMask Onboarding
- **Graphics**: Spline 3D, Lucide icons, Radix UI components
- **Testing**: Truffle tests (Mocha, Chai)

## Prerequisites

- Node.js (v16+)
- npm or Yarn
- Ganache CLI or Ganache GUI for local blockchain
- MetaMask browser extension
- Supabase project (for authentication)
- Ethereum wallet

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yashvardhan2006/Decentralized-Auction-Platform.git
cd Decentralized-Auction-Platform
```
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### 2. Backend Setup [(Detailed)](backend/README.md)

```bash
cd backend
npm install
```

#### Configure and Run Local Blockchain

Start Ganache (CLI or GUI):

```bash
ganache
```

Compile and migrate contracts:

```bash
truffle migrate
```



#### From the Deployed contract copy the contract address of 2_deploy_auction.js and paste it in AUCTION_ADDRESS in auction.ts(In our case- frontend/app/lib/auction.ts) file.
Then, go to the frontend file located at:
```bash
frontend/app/lib/auction.ts
```
And replace the AUCTION_ADDRESS value with your deployed contract address:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Environment Variables

Create a `.env.local` file in the `frontend` directory with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Backend Commands(For testing smart contract)

```bash
cd backend
truffle console
```

Inside the Truffle console:

```js
const accounts = await web3.eth.getAccounts();
const instance = await AuctionSystem.deployed();

// Create an auction
await instance.createAuction("Item Name", web3.utils.toWei("1", "ether"), { from: accounts[0] });

// Place a bid
await instance.placeBid(1, { from: accounts[1], value: web3.utils.toWei("2", "ether") });

// End the auction
await instance.endAuction(1, { from: accounts[0] });

// View auction details
const auction = await instance.getAuction(1);
console.log(auction);
```

### Frontend Usage

- Browse active auctions on the homepage.
- Connect your Ethereum wallet (MetaMask) via the Auth buttons.
- Create new auctions on the "Sell" page.
- Place bids directly from auction listings.
- View your profile and dashboard for your auctions and bids.



