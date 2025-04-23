module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 8545,            // Ganache CLI port
      network_id: "*",       // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",      // Match your contract's pragma version
    }
  }
};
