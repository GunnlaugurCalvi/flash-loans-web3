const { network, ethers } = require("hardhat");

const fundErc20 = async (contract, sender, recepient, amount) => {
  const FUND_AMOUNT = ethers.utils.parseUnits(amount, 18);
  // fund erc20 token to the contract
  const signer = await ethers.getSigner(sender);

  const contractSigner = contract.connect(signer);
  await contractSigner.transfer(recepient, FUND_AMOUNT);
};

// Impersonate account
// HardHat Docs https://hardhat.org/hardhat-network/docs/reference#hardhat-impersonateaccount
const impersonateFundErc20 = async (contract, sender, recepient, amount) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sender],
  });

  // fund baseToken to the contract
  await fundErc20(contract, sender, recepient, amount);
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [sender],
  });
};

    // Factory and Routing Addresses
const PANCAKE_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
const PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

    // Token Addresses
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address private constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address private constant CAKE = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
    address private constant DOT = 0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402;

    // Trade Variables
    uint256 private deadline = block.timestamp + 1 days;
    uint256 private constant MAX_INT =
        115792089237316195423570985008687907853269984665640564039457584007913129639935;


module.exports = {
  impersonateFundErc20,
};
