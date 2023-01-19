import axios from "axios";
// import Web3 from 'web3';
// const web3 = new Web3(new Web3.providers.HttpProvider());
// const version = web3.version.api;

export async function fetchContracts(address){
    let contracts
    const response = await axios.get('https://api.etherscan.io/api', {
    params: {
        module: 'contract',
        action: 'getsourcecode',
        address: `${address}`,
        apikey: 'D2QM9JPD6UMK1XYCTK32SE9IRZCP8BF1AG'

    }
    })
    
    console.log(response.data.status)
    if (response.data.status == 1){
        contracts = response.data.result
        console.log(typeof contracts)
        return contracts
        //console.log(response.data.result)
    }
}
// result = fetchContracts('0x9690b63Eb85467BE5267A3603f770589Ab12Dc95')
// console.log(result)