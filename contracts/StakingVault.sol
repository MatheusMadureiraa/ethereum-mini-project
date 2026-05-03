// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract StakingVault is ReentrancyGuard {
    IERC20 public stakingToken;
    AggregatorV3Interface internal priceFeed;

    mapping(address => uint256) public stakedAmount;
    
    constructor(address _token, address _priceFeed) {
        stakingToken = IERC20(_token);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
    }

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Valor invalido");
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakedAmount[msg.sender] += _amount;
    }

    // A recompensa poderia ser multiplicada pelo "getLatestPrice()" no saque
    function withdraw() external nonReentrant {
        uint256 amount = stakedAmount[msg.sender];
        require(amount > 0, "Sem fundos");
        stakedAmount[msg.sender] = 0;
        stakingToken.transfer(msg.sender, amount);
    }
}