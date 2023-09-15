const { ethers, providers } = require("ethers");

// TESTNET Göerli
function getProvider() {
  return new ethers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/CrTB4RNy3q66bfE0eXPmSN8fb5dbSMtB"
  );
}

async function getGasPrice() {
  return getProvider().estimateGas().then();
}

module.exports = {
  getProvider,
  getGasPrice,
};
