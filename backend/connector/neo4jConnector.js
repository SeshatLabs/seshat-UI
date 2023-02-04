import { driver, session, auth } from 'neo4j-driver';

class Neo4jConnector {
    session;
    constructor(url, username, password) {
        this.connect(url, username, password);
    }

    connect(url, username, password) {
        let neo4jDriver = driver(
            url,
            auth.basic(username, password)
        );
        this.session = neo4jDriver.session({ defaultAccessMode: session.READ });
    }

    async searchAccountSubgraph(field, searchQuery, maxLevel = 2) {
        return await this.session.run(`MATCH (c) WHERE c.${field} = "${searchQuery}"
        CALL apoc.path.subgraphAll(c, {maxLevel: ${maxLevel}}) YIELD nodes, relationships 
        RETURN nodes, relationships`);
    }
}

export default function neo4jConnector() {
    return new Neo4jConnector(process.env.NEO4J_URL, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);
}
