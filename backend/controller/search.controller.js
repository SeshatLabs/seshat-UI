import { searchAccountAddressSubgraph } from "../dao/account.dao";

export default async function searchGraphQuery(query) {
    // make this a cascading function to handle the different 
    // search types. For now, just query address
    return await searchAccountAddressSubgraph(query)
}