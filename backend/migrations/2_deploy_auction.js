const AuctionSystem = artifacts.require("AuctionSystem");

module.exports = function (deployer) {
  deployer.deploy(AuctionSystem);
};
