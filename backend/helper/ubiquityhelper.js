import axios from 'axios'
import {CONSTANTS} from '../shared/Constants'


const baseURL = 'https://svc.blockdaemon.com/universal/v1' 
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': 'Bearer ZHtLOMsDvmhUPmOv4EqPEx-SluEIqrgJD853HUJhWpbnTK8k'
    }
})

export function fetchTxByHash(protocol, network){
    //TODO: implement get transaction by hash function
}

export async function fetchTxs(protocol, network, pageSize, pageToken=null){
    let endPoint
    if (pageToken){
        endPoint = `/${protocol}/${network}/txs?page_size=${pageSize}&page_token=${pageToken}`
    }else{
        endPoint = `/${protocol}/${network}/txs?page_size=${pageSize}`
    }
    try {
        const { data } = await instance.get(`${endPoint}`);
        return data;
      } catch (error) {
        console.log(error);
      }
}

export async function fetchContracts(){
    let endPoint 
    
}

