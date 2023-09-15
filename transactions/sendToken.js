const { ethers } = require("ethers");
const PRIVKEY = "TOKEN HOLDER PRIV KEY";

(async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/7dJV6DJRzO4kcSR8PPM36ZVLdCnzv9_6"
  );
  const signer = new ethers.Wallet(PRIVKEY, provider);

  const tx = await signer.sendTransaction({
    to: "RECIPIENT ADDRESS",
    value: ethers.parseUnits("0.1", "ether"),
  });
  console.log(tx);
})();
