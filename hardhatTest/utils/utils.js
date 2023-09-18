const hre = require("hardhat");

const fetchSigner = () => {
  const wallet = new hre.ethers.Wallet(
    // wallet private key
    process.env.PRIVATE_KEY,
    fetchProvider()
  );

  return wallet.connect(fetchProvider());
};

const fetchProvider = () => {
  // Alchemy/Infura Api key
  return new hre.ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);
};

module.exports = {
  fetchSigner,
  fetchProvider,
};
