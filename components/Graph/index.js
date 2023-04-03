import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionLineType,
    MarkerType,
    useReactFlow
} from 'reactflow';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    SimpleGrid,
} from '@chakra-ui/react'

import AccountNode from './AccountNode.js';

import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force';

import FloatingEdge from './FloatingEdge.js';
import FloatingConnectionLine from './FloatingConnectionLine.js';
import { useCallback, useEffect } from 'react';


import 'reactflow/dist/style.css';
import styles from './Graph.module.css'
import { useState } from 'react';

const SEARCH_ENDPOINT = 'http://lg-research-1.uwaterloo.ca:8093/search';

const defaultEdgeOptions = {
    animated: true,
    type: 'default',
};

const edgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    account: AccountNode,
};

const Graph = ({ searchText, hop }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [hovered, setHovered] = useState([]);

    const [paths, setPaths] = useState([]);
    const [nodesLength, setNodesLength] = useState(0);
    const { setCenter } = useReactFlow();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)),
        [setEdges]
    );

    const onEdgeClick = (event, edge) => {
        setNodes(nodes.map((node) => {
            if (node.id === edge.source || node.id === edge.target) {
                return { ...node, selected: true }
            } else {
                return node;
            }
        }))
    }

    useEffect(() => {
        if (!hovered) {
            return;
        }

        const pathNodeIds = hovered.map(e => [e.start_node.address, e.end_node.address]).flat();
        const relationshipIds = hovered.map(e => e.tx_id + e.start_node.address + e.end_node.address);
        setNodes(nodes.map((node) => {
            if (pathNodeIds.includes(node.id)) {
                return { ...node, data: { ...node.data, hovered: true } }
            } else {
                return { ...node, data: { ...node.data, hovered: false } };
            }
        }))

        setEdges(edges.map((edge) => {
            if (relationshipIds.includes(edge.id)) {
                return { ...edge, data: { ...edge.data, hovered: true } }
            } else {
                return { ...edge, data: { ...edge.data, hovered: false } };
            }
        }))
    }, [hovered]);

    useEffect(() => {
        if (nodesLength != nodes.length) {
            setTimeout(() => {
                setCenter(0, 0, { zoom: 0.5 });
                setNodesLength(nodes.length)
            }, 500);
        }
    }, [nodes])

    useEffect(() => {
        const getUsers = async () => {
            if (!searchText || !hop) {
                return;
            }
            const res = await fetch(SEARCH_ENDPOINT + '?' + new URLSearchParams({
                query: searchText,
                hop: hop
            }), { 
                method: "GET",
                mode: "cors"
            })

            let body = await res.json();
            //let body = ret_data;

            const data = body[0]

            if (data.nodes.length + data.relationships.length === 0) {
                return;
            }

            setPaths(data.paths);
            const nodes = data.nodes;

            const relationships = data.paths.map((totalPath) => { 
                return totalPath.path;
            }).flat();


            const indMapping = new Map();
            for (let rel in relationships) {
                let parsed;
                try { parsed = await JSON.parse(relationships[rel].properties); } catch (e) { parsed = {} }
                relationships[rel].properties = parsed;
            }

            nodes.forEach((node, i) => {
                indMapping.set(node.address, i)
            });

            const sim_nodes = nodes.map((node) => {
                if (node.address === searchText) {
                    return { fx: 0, fy: 0 };
                }
                return {}
            });

            const sim_links = relationships.map((relationship) => {
                return { source: indMapping.get(relationship.start_node.address), target: indMapping.get(relationship.end_node.address) };
            });



            let simulation = forceSimulation(sim_nodes)
                .force('charge', forceManyBody().strength(-30000))
                .force('center', forceCenter(0, 0))
                .force('link', forceLink()
                    .links(sim_links)).on('end', () => {
                        console.log(sim_nodes)
                        console.log(sim_links)
                        setNodes(nodes.map((node, i) => {
                            return {
                                id: node.address,
                                data: { label: node.address, name: node?.ContractName, hovered: false },
                                position: { x: sim_nodes[i].x, y: sim_nodes[i].y },
                                className: `${node.ContractName ? styles.userNode : styles.contractNode} ${styles.accountNode}`,
                                type: 'account',
                                selected: node.address === searchText ? true : false
                            }
                        }));
                        setEdges(relationships.map((relationship, i) => {
                            return {
                                id: relationship.tx_id + relationship.start_node.address + relationship.end_node.address,
                                source: relationship.start_node.address, target: relationship.end_node.address, type: 'floating', markerEnd: {
                                    type: MarkerType.Arrow,
                                }, data: { label: relationship.label, hovered: false, properties: relationship.properties }
                            }
                        }));
                    });
        }
        getUsers();
    }, [searchText, hop])


    return <SimpleGrid columns={2} h='100%'>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Path (Transaction ID) </Th>
                        <Th>Rank</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        paths.sort((a, b) => { a.score - b.score }).map((path, i) =>
                            <Tr className={styles.tableEntry} onMouseEnter={() => { setHovered(path.path) }} onMouseLeave={() => { setHovered([]) }}>
                                <Td>{path.path[0].tx_id}</Td>
                                <Td>{i + 1}</Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>

        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            connectionLineComponent={FloatingConnectionLine}
            onEdgeClick={onEdgeClick}

            fitView
        /></SimpleGrid>
}

export default Graph;