const { ethers, providers } = require("ethers");

function getProvider() {
  return new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/JymRcC3zGPIldQY5wuWos4lNN3YiFBVM"
  );
}

module.exports = {
  getProvider,
};
