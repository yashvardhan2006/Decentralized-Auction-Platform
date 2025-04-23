// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AuctionSystem is ReentrancyGuard {
    struct Auction {
        string itemName;
        uint256 startPrice;
        uint256 endTime;
        address payable owner;
        address highestBidder;
        uint256 highestBid;
        bool ended;
    }

    uint256 public auctionCount;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => mapping(address => uint256)) public bids;

    event AuctionCreated(uint256 indexed id, string itemName, uint256 startPrice, uint256 endTime);
    event BidPlaced(uint256 indexed id, address bidder, uint256 amount);
    event AuctionEnded(uint256 indexed id, address winner, uint256 amount);

    modifier onlyOwner(uint256 _id) {
        require(msg.sender == auctions[_id].owner, "Not the auction owner");
        _;
    }

    modifier auctionActive(uint256 _id) {
        require(block.timestamp < auctions[_id].endTime, "Auction ended");
        require(!auctions[_id].ended, "Auction already finalized");
        _;
    }

    function createAuction(string calldata _itemName, uint256 _startPrice, uint256 _duration) external {
        require(_duration > 0, "Duration must be > 0");

        auctionCount++;
        auctions[auctionCount] = Auction({
            itemName: _itemName,
            startPrice: _startPrice,
            endTime: block.timestamp + _duration,
            owner: payable(msg.sender),
            highestBidder: address(0),
            highestBid: 0,
            ended: false
        });

        emit AuctionCreated(auctionCount, _itemName, _startPrice, block.timestamp + _duration);
    }

    function placeBid(uint256 _id) external payable auctionActive(_id) nonReentrant {
        Auction storage auction = auctions[_id];
        require(msg.value > auction.startPrice, "Bid below starting price");
        require(msg.value > auction.highestBid, "Must outbid current bid");

        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = msg.sender;

        bids[_id][msg.sender] = msg.value;

        emit BidPlaced(_id, msg.sender, msg.value);
    }

    function endAuction(uint256 _id) external onlyOwner(_id) nonReentrant {
        Auction storage auction = auctions[_id];
        require(!auction.ended, "Already ended");
        require(block.timestamp >= auction.endTime, "Auction still ongoing");

        auction.ended = true;

        if (auction.highestBidder != address(0)) {
            auction.owner.transfer(auction.highestBid);
        }

        emit AuctionEnded(_id, auction.highestBidder, auction.highestBid);
    }

    function getAuction(uint256 _id) external view returns (
        string memory itemName,
        uint256 startPrice,
        uint256 endTime,
        address highestBidder,
        uint256 highestBid,
        bool ended
    ) {
        Auction storage auction = auctions[_id];
        return (
            auction.itemName,
            auction.startPrice,
            auction.endTime,
            auction.highestBidder,
            auction.highestBid,
            auction.ended
        );
    }

    function getAuctionCount() public view returns (uint) {
    return auctionCount;
}

}