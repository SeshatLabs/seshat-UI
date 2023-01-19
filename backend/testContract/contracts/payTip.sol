pragma solidity ^0.8.0;

contract Tipping {
    address payable public singer;
    mapping(address => uint256) public balances;

    constructor(address payable _singer) public {
        singer = _singer;
    }

    function tip() public payable {
        require(msg.value > 0, "Cannot tip zero or negative value.");
        balances[msg.sender] = balances[msg.sender].sub(msg.value);
        singer.transfer(msg.value);
    }

    function withdraw() public {
        require(balances[msg.sender] == address(this).balance, "Invalid balance.");
        msg.sender.transfer(address(this).balance);
    }
}
