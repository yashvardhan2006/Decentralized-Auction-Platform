// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AuctionSystem is ReentrancyGuard {
    // ─── 1) PACKED STRUCT ──────────────────────────────────────────────
    // slot0: dynamic `itemName` pointer
    // slot1: uint256 startPrice
    // slot2: uint256 highestBid
    // slot3: address payable owner
    // slot4: address highestBidder (20 bytes) + bool ended (1 byte)  ⬅︎ packed
    struct Auction {
        string   itemName;
        uint256  startPrice;
        uint256  highestBid;
        address payable owner;
        address  highestBidder;
        bool     ended;
    }

    // ─── 2) STATE ─────────────────────────────────────────────────
    uint256                  public auctionCount;
    mapping(uint256 => Auction) public auctions;

    // ─── 3) EVENTS ────────────────────────────────────────────────
    event AuctionCreated(uint256 indexed id, string itemName, uint256 startPrice);
    event BidPlaced     (uint256 indexed id, address indexed bidder, uint256 amount);
    event AuctionEnded  (uint256 indexed id, address indexed winner, uint256 amount);

    // ─── 4) CREATE ─────────────────────────────────────────────────
    function createAuction(string calldata _itemName, uint256 _startPrice) external {
        // unchecked skips the Solidity overflow check here (safe in practice)
        unchecked { auctionCount++; }
        auctions[auctionCount] = Auction({
            itemName:       _itemName,
            startPrice:     _startPrice,
            highestBid:     0,
            owner:          payable(msg.sender),
            highestBidder:  address(0),
            ended:          false
        });
        emit AuctionCreated(auctionCount, _itemName, _startPrice);
    }

    // ─── 5) BID ────────────────────────────────────────────────────
    function placeBid(uint256 _id) external payable nonReentrant {
        Auction storage a = auctions[_id];

        require(!a.ended,               "Auction already finalized");
        require(msg.value > a.startPrice
             && msg.value > a.highestBid, "Bid too low");

        // cache old values to refund later
        uint256 oldBid       = a.highestBid;
        address payable oldWinner = payable(a.highestBidder);

        // update state just once
        a.highestBid      = msg.value;
        a.highestBidder   = msg.sender;
        emit BidPlaced(_id, msg.sender, msg.value);

        // refund previous bidder (if any)
        if (oldWinner != address(0)) {
            (bool ok, ) = oldWinner.call{ value: oldBid }("");
            require(ok, "Refund failed");
        }
    }

    // ─── 6) END ────────────────────────────────────────────────────
    function endAuction(uint256 _id) external nonReentrant {
        Auction storage a = auctions[_id];
        require(!a.ended,                "Already ended");
        require(msg.sender == a.owner,   "Not the auction owner");

        a.ended = true;
        emit AuctionEnded(_id, a.highestBidder, a.highestBid);

        // transfer winning bid to owner
        if (a.highestBid > 0) {
            (bool ok, ) = a.owner.call{ value: a.highestBid }("");
            require(ok, "Payout failed");
        }
    }

    // ─── 7) VIEW ───────────────────────────────────────────────────
    function getAuction(uint256 _id)
        external
        view
        returns (
            address owner,
            string memory itemName,
            uint256 startPrice,
            address highestBidder,
            uint256 highestBid,
            bool ended
        )
    {
        Auction storage a = auctions[_id];
        return (a.owner, a.itemName, a.startPrice, a.highestBidder, a.highestBid, a.ended);
    }
}