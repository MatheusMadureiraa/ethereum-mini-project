// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleDAO {
    IERC20 public votingToken; // referência ao ERC-20

    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public votes;

    constructor(address _tokenAddress) {
        votingToken = IERC20(_tokenAddress);
    }

    function createProposal(string memory _desc) external {
        proposals.push(Proposal(_desc, 0, false));
    }

    function vote(uint256 _propId) external {
        // o usuário precisa ter pelo menos 1 token (ajustado para decimais)
        require(votingToken.balanceOf(msg.sender) >= 1 * 10**18, "Voce precisa de tokens STK para votar");
        require(!votes[_propId][msg.sender], "Ja votou");

        proposals[_propId].voteCount++;
        votes[_propId][msg.sender] = true;
    }
}