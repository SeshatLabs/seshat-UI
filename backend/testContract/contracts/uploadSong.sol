pragma solidity ^0.8.0;

import "https://github.com/ipfs/js-ipfs-api/raw/master/src/index.js";

contract SongUpload {
    address public singer;
    string public songHash;

    constructor() public {
        singer = msg.sender;
    }

    function uploadSong(string memory _songName, string memory _songHash) public {
        require(msg.sender == singer, "Only the singer can upload a song.");
        songHash = _songHash;
    }
}