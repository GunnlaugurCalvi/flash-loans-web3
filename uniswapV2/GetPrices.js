const ethers = require("ethers");

const {
  uniswapFactoryAddress,
  uniswapRouterAddress,
  wrappedEtherContract,
  wrappedSushiContract,
} = require("./AddressList");

const { factoryERC20Abi, routerABI } = require("./AbiList");
const provider = new ethers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/JymRcC3zGPIldQY5wuWos4lNN3YiFBVM"
);

const factoryContract = new ethers.Contract(
  uniswapFactoryAddress,
  factoryERC20Abi,
  provider
);

const router = new ethers.Contract(uniswapRouterAddress, routerABI, provider);

const wrappedEthContract = new ethers.Contract(
  wrappedEtherContract,
  factoryERC20Abi,
  provider
);

const sushiContract = new ethers.Contract(
  wrappedSushiContract,
  factoryERC20Abi,
  provider
);

const getDecimals = async (token) => {
  let decimals;
  if (token == "SUSHI") {
    decimals = await sushiContract.decimals();
  } else {
    decimals = await wrappedEthContract.decimals();
  }
  return decimals;
};

const getPrices = async (amount) => {
  const sushiDecimals = await getDecimals(sushiContract.symbol());
  const wrappedEthDecimals = await getDecimals(wrappedEthContract.symbol());

  const amountsIn = ethers.parseUnits(amount, sushiDecimals).toString();
  let amountsOut = await router.getAmountsOut(amountsIn, [
    wrappedEthContract,
    sushiContract,
  ]);

  amountsOut = ethers.formatUnits(amountsOut[1].toString(), sushiDecimals);
  console.log(amountsOut);
};

getPrices("1");
