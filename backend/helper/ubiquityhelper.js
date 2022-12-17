import axios from 'axios'
import {CONSTANTS} from '../shared/Constants'


const baseURL = 'https://svc.blockdaemon.com/universal/v1/' // https://svc.blockdaemon.com/universal/v1/{protocol}/{network}/txs
const instance = axios.create({
    url: baseURL,
    timeout: 1000,
    headers: {
        'Authorization': `${CONSTANTS.ubiquitySK}`
    }
})

export function getTxByHash(protocol, network){
    //TODO: implement get transaction by hash function
}

export function getTxs(protocol, network, pageSize=null, pageToken=null){
    if (pageSize && pageToken){
        endPoint = `${protocol}/${network}/txs?page_size=${pageSize}&page_token=${pageToken}`
    }else{
        endPoint = `${protocol}/${network}/txs`
    }
    result = async function getTransactions () {
        instance.get(`${endPoint}`).then(function (response) {
            return response
        }).catch(function (error) {
            console.log(error)
        })
    }

}

