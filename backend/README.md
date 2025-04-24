# Auction DApp Setup and Usage Guide

This guide helps you set up your development environment using **Ganache** and **Truffle**, and provides common commands for interacting with your Auction smart contract.

---


## ⚙️ Installing Truffle and Ganache

```bash
npm install -g truffle
npm install -g ganache
```

To run Ganache (CLI):
```bash
ganache
```

---

## 🔨 Project Setup(In separate terminal)


1. Compile and migrate:
```bash
truffle migrate --reset
```

---

## 🔎 Truffle Console Commands
Start the console:
```bash
truffle console
```

Inside the console:

### ✅ Get Accounts
```js
const accounts = await web3.eth.getAccounts()
```

### 💼 Deploy Contract
```js
const instance = await AuctionSystem.deployed()
```

### ➕ Create Auction
```js
await instance.createAuction("Laptop", web3.utils.toWei("1", "ether"), { from: accounts[0] })
```

### 💵 Place Bid
```js
await instance.placeBid(1, { from: accounts[1], value: web3.utils.toWei("2", "ether") })
```

### ❌ End Auction
```js
await instance.endAuction(1, { from: accounts[0] })
```

### 📊 View Auction Info
```js
const a = await instance.getAuction(1);
```
```js
console.log(a)
```

### 🪙 View All Balances (One-Liner)
```js
(await web3.eth.getAccounts()).forEach(async (a, i) => console.log(`Account[${i}]: ${web3.utils.fromWei(await web3.eth.getBalance(a), 'ether')} ETH`));

```

---

## 🔐 Tips
- Use `truffle migrate --reset` to redeploy fresh contract state.
- Auction IDs start from 1 and increment.
- Always check the auction state before placing or ending.

---

## 🚀 You're ready to go!
Use this as a base to extend the DApp with frontend, user auth, and more. Happy coding! ✨

