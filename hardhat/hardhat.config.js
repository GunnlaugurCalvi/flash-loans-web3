require("@nomicfoundation/hardhat-toolbox");

const INFURA = process.env.INFURA_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.PRIVATE_KEY;

//Extend hardhat task
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
