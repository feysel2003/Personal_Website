// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PortfolioGuestbook {
    
    struct Entry {
        address user;
        string name;
        string message;
        uint256 timestamp;
        bool hasTipped;
    }

    Entry[] public entries;
    address payable public owner;

    event NewEntry(address indexed user, string name, string message, bool hasTipped);

    constructor() {
        owner = payable(msg.sender); 
    }

    function signGuestbook(string memory _name, string memory _message) public payable {
        bool isTip = msg.value > 0;

        entries.push(Entry(
            msg.sender,
            _name,
            _message,
            block.timestamp,
            isTip
        ));

        if (isTip) {
            (bool success, ) = owner.call{value: msg.value}("");
            require(success, "Tip transfer failed.");
        }

        emit NewEntry(msg.sender, _name, _message, isTip);
    }

    function getEntries() public view returns (Entry[] memory) {
        return entries;
    }
}