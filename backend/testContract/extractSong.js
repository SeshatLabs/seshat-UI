const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function readSong(songHash) {
    const songBuffer = await ipfs.files.cat(songHash);
    return songBuffer.toString();
}