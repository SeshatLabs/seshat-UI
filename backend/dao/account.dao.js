import neo4jConnector from '../connector/neo4jConnector'

export async function searchAccountAddressSubgraph(address) {
    let connector = neo4jConnector();
    return await connector.searchAccountSubgraph('address', address);
}
