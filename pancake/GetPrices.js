const ethers = require("ethers");
const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiList");

// const provider = new ethers.pr("https://bsc-dataseed.bnbchain.org");

const provider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.bnbchain.org",
);

const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider,
);

const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

const getPrices = async (amount) => {
  const contractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await contractToken.decimals();
  const amountIn = ethers.parseUnits(amount, decimals);

  const prices = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);

  const contractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
  const decimalsForToken2 = await contractToken2.decimals();
  const amountInToken2 = ethers.formatUnits(
    price[1].toString(),
    decimalsForToken2,
  );

  console.log(amountInToken2);
};

const amount = "500";
getPrices(amount);
