// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public votes;

    function createProposal(string memory _desc) external {
        proposals.push(Proposal(_desc, 0, false));
    }

    function vote(uint256 _propId) external {
        require(!votes[_propId][msg.sender], "Ja votou");
        proposals[_propId].voteCount++;
        votes[_propId][msg.sender] = true;
    }
}