// https://docs.uniswap.org/sdk/v3/guides/quoting
// https://docs.uniswap.org/sdk/v3/guides/trading
// https://docs.uniswap.org/sdk/v3/guides/routing

const { ethers } = require("ethers");

const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const { getProvider } = require("./providers");
const { FeeAmount } = require("@uniswap/v3-sdk");
const QUOTER_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
const ADDRESS_FROM = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const ADDRESS_TO = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

async function getPrice(from, to, amountIn) {
  const quoterContract = new ethers.Contract(
    QUOTER_ADDRESS,
    QuoterABI,
    getProvider()
  );

  amountIn = ethers.utils.parseUnits(amountIn.toString(), 6);
  let quoteAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    ADDRESS_FROM,
    ADDRESS_TO,
    FeeAmount.MEDIUM,
    amountIn.toString(),
    0
  );

  quoteAmountOut = ethers.utils.formatUnits(quoteAmountOut.toString(), 18);
  return quoteAmountOut;
}

const main = async () => {
  const amountIn = 1600;
  const amountOut = await getPrice(ADDRESS_FROM, ADDRESS_TO, amountIn);
  console.log(amountOut);
};

main();
