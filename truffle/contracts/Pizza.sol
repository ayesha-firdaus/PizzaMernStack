// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pizza {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function buyPizza(uint amount) public payable {
        payable(owner).transfer(amount);
    }
    function getOwnerBalance() public view returns(uint){
      return owner.balance;
    }
}