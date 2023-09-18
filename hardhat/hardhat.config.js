require("@nomicfoundation/hardhat-toolbox");

const INFURA = "6c974f3a00e4430bb4262c14d9239216";
const SEPOLIA_PRIVATE_KEY =
  "e5168fa30bbc332d7f2b6289596ebd654ae345938f78af525e4cc2071214c3b0";

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
    apiKey: "DSN3P5NBQP8B1XIGUJKIYCFQYDFHYYP2HF",
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
