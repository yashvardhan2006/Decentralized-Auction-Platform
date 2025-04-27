// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// ——————————————————————————————————————————————
// Custom errors are far cheaper than revert‐strings.
// ——————————————————————————————————————————————
error NotOwner(uint256 auctionId, address caller);
error AuctionFinalized(uint256 auctionId);
error BidTooLow(uint256 auctionId, uint256 sent, uint256 highestBid);

contract AuctionSystem is ReentrancyGuard {
    struct Auction {
        address payable owner;    // 20 bytes
        address          winner;  // 20 bytes
        uint256          start;   // 32 bytes
        uint256          topBid;  // 32 bytes
        bool             ended;   // 1 byte
        string           name;    // dynamic, stored separately
    }
    uint256 public auctionCount;
    mapping(uint256 => Auction) private auctions;

    // ——————————————————————————————————————————————
    // We index both auction ID and participant to let
    // off-chain listeners filter cheaply.
    // ——————————————————————————————————————————————
    event AuctionCreated(
        uint256 indexed id,
        address indexed owner,
        string   name,
        uint256  start
    );
    event BidPlaced(
        uint256 indexed id,
        address indexed bidder,
        uint256        amount
    );
    event AuctionEnded(
        uint256 indexed id,
        address indexed winner,
        uint256        amount
    );

    // ——————————————————————————————————————————————
    // 1) bump count in one SSTORE
    // 2) pack statics before dynamic string
    // ——————————————————————————————————————————————
    function createAuction(string calldata name, uint256 startPrice) external {
        uint256 id = ++auctionCount;
        auctions[id] = Auction({
            owner:    payable(msg.sender),
            winner:   address(0),
            start:    startPrice,
            topBid:   0,
            ended:    false,
            name:     name
        });
        emit AuctionCreated(id, msg.sender, name, startPrice);
    }

    // ——————————————————————————————————————————————
    // Uses nonReentrant, custom errors, and .call() refund
    // instead of transfer() to save stipend logic gas.
    // ——————————————————————————————————————————————
    function placeBid(uint256 id) external payable nonReentrant {
        Auction storage a = auctions[id];
        if (a.ended)                              revert AuctionFinalized(id);
        if (msg.value <= a.start || msg.value <= a.topBid)
                                                 revert BidTooLow(id, msg.value, a.topBid);

        // refund previous bidder
        address prev = a.winner;
        uint256 prevAmt = a.topBid;

        a.topBid   = msg.value;
        a.winner   = msg.sender;

        if (prev != address(0)) {
            (bool ok, ) = prev.call{value: prevAmt}("");
            require(ok, "Refund failed");
        }

        emit BidPlaced(id, msg.sender, msg.value);
    }

    // ——————————————————————————————————————————————
    // Custom-owner check + reentrancy + call payout
    // ——————————————————————————————————————————————
    function endAuction(uint256 id) external nonReentrant {
        Auction storage a = auctions[id];
        if (msg.sender != a.owner)               revert NotOwner(id, msg.sender);
        if (a.ended)                             revert AuctionFinalized(id);

        a.ended = true;

        if (a.winner != address(0)) {
            (bool ok, ) = a.owner.call{value: a.topBid}("");
            require(ok, "Payout failed");
        }
        emit AuctionEnded(id, a.winner, a.topBid);
    }

    // ——————————————————————————————————————————————
    // Manual getter so we can keep mapping private
    // ——————————————————————————————————————————————
    function getAuction(uint256 id)
        external
        view
        returns (
            address owner,
            address highestBidder,
            uint256 startPrice,
            uint256 highestBid,
            bool    ended,
            string  memory name
        )
    {
        Auction storage a = auctions[id];
        return (a.owner, a.winner, a.start, a.topBid, a.ended, a.name);
    }
}