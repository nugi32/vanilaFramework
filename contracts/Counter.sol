// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract counter {

  uint public value;
  address public owner;

  constructor(uint _initialValue, address _owner) {
    value = _initialValue;
    owner = _owner;
  }

  function changeOwner(address _newOwner) public {
    require(msg.sender == owner, "Only owner can change owner");
    owner = _newOwner;
  }

  function increment() public {
    value ++;
  }

  function decracement() public {
    value --;
  }

  function resetValue() public {
    value = 0;
  }
}