// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "./interfaces/IUniswapV2Router01.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./libs/UniswapV2Library.sol";

// Only for development
import "hardhat/console.sol";

contract PancakeFlashSwap {
    using SafeERC20 for IERC20;

    // Factory and Routing Addresses
    address private constant PANCAKE_FACTORY =
        0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
    address private constant PANCAKE_ROUTER =
        0x10ED43C718714eb63d5aA57B78B54704E256024E;

    // Token Addresses
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address private constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address private constant CAKE = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
    address private constant DOT = 0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402;

    // Trade Variables
    uint256 private deadline = block.timestamp + 1 days;
    uint256 private constant MAX_INT =
        115792089237316195423570985008687907853269984665640564039457584007913129639935;

    // a way to fund contract knowing the faucet address
    // geeky
    function FundMyContract(address _owner, address _token, uint amount) public {
        IERC20(_token).transferFrom(_owner, address(this), amount);
    }

    function getContractBalanceForToken(_token) public view returns(uint256) {
        IERC20(_token).balanceOf(address(this));
    }

    function startArb(address _borrowedTokenAddress, uint _amount) external {
        IERC20(BUSD).safeApprovve(address(PANCAKE_ROUTER), MAX_INT);
        IERC20(CAKE).safeApprovve(address(PANCAKE_ROUTER), MAX_INT);
        IERC20(DOT).safeApprovve(address(PANCAKE_ROUTER), MAX_INT);

        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(_borrowedTokenAddress, WBNB);
        require(pair != address(0), "Pool does not exist");

        address token0 = IUniswapV2Pair(pair).token0();
        address token1 = IUniswapV2Pair(pair).token1();

        uint256 amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint256 amount1Out = _tokenBorrow == token1 ? _amount : 0;

        bytes memory data = abi.encode(_borrowedTokenAddress, _amount, msg.sender);

        // Execute first swap and get the loan 
        IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
    }

    function pancakeCall(address sender, uint amount0Out, uint amount1Out, bytes calldata data) external {
        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(token0, token1);

        require(msg.sender == pair, "The sender needs to match the pair");
        require(sender == address(this), "Sender should match this contract");

        (address borrowedTokenAddress, uint256 amount, address myAddress) = abi.decode(data, (address, uint256, address));

        // Calculate the amount to repay at the end
        uint256 fee = ((amount * 3) / 997) + 1;
        uint256 amountToRepay = amount + fee;

        

    }
}
