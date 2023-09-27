require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.5.0",
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.binance.org/",
      },
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [
        "e5168fa30bbc332d7f2b6289596ebd654ae345938f78af525e4cc2071214c3b0",
      ], //private key goes heere
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
    },
  },
};
