const { ethers } = require("ethers");
const { getProvider } = require("./providers.js");
const { FeeAmount } = require("@uniswap/v3-sdk");

const FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const WBTC_ADDRESS = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const poolABI = [
  "function getPool(address tokenA,address tokenB,uint24 fee) external view returns (address pool)",
];

const contractFactory = new ethers.Contract(
  FACTORY_ADDRESS,
  poolABI,
  getProvider()
);

const getPoolAddress = async () => {
  const poolAddress = await contractFactory.getPool(
    WBTC_ADDRESS,
    WETH_ADDRESS,
    FeeAmount.MEDIUM
  );
  console.log(poolAddress);
  return poolAddress;
};

getPoolAddress();
