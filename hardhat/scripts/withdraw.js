const hre = require("hardhat");
const { abi } = require("../artifacts/contracts/Lock.sol/Lock.json");
const { fetchSigner, fetchProvider } = require("../utils/utils.js");
require("dotenv").config();
const { MY_ADDRESS } = process.env;
// The address that the deploy.js spits out
const CONTRACT_ADDRESS = "0x893529b2fd6F5285Ff43637Ad093B9550E88e758";

async function main() {
  withdrawMyLockedMoney();
}

async function withdrawMyLockedMoney() {
  const provider = fetchProvider();
  const contract = new hre.ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  const signer = fetchSigner();

  let bal = await provider.getBalance(MY_ADDRESS);
  console.log("my balance ", hre.ethers.formatEther(bal.toString()));

  await contract
    .connect(signer)
    .isReadyToUnlock()
    .catch((err) => {
      console.log("caught it ", err);
      return;
    });

  let withdraw = await contract.connect(signer).withdraw();
  await withdraw.wait;

  // Attach listener for event but gets removed after fired once
  contract.once("Withdrawal", (amount, when) => {
    console.log(
      `Withdrawal event received - Amount: ${hre.ethers.formatEther(
        amount.toString()
      )}, When: ${when}, balance total: ${
        parseFloat(hre.ethers.formatEther(amount.toString())) +
        parseFloat(hre.ethers.formatEther(bal.toString()))
      }`
    );
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
