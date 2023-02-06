import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    ConnectionLineType,
    MarkerType,
    useReactFlow
} from 'reactflow';

import AccountNode from './AccountNode.js';

import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force';

import FloatingEdge from './FloatingEdge.js';
import FloatingConnectionLine from './FloatingConnectionLine.js';
import { useCallback, useEffect } from 'react';


import 'reactflow/dist/style.css';
import styles from './Graph.module.css'
import { useState } from 'react';



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

const Graph = ({ searchText }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
        if (nodesLength != nodes.length) {
            setTimeout(() => {
                setCenter(0, 0, { zoom: 0.5 });
                setNodesLength(nodes.length)
            }, 500);
        }
    }, [nodes])

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/search?' + new URLSearchParams({
                text: searchText
            }), { method: "GET" })

            let body = await res.json();
        
            const data = body.data

            if (data.node_data.length + data.relationship_data.length === 0) {
                return;
            }

            const node_data = data.node_data
            const relationship_data = data.relationship_data
            const indMapping = new Map();

            node_data.forEach((node, i) => {
                indMapping.set(node.elementId, i)
            });

            const sim_nodes = node_data.map((node) => {
                if (node.properties.address === searchText) {
                    return { fx: 0, fy: 0 };
                }
                return {};
            });
            const sim_links = relationship_data.map((relationship) => {
                return { source: indMapping.get(relationship.startNodeElementId), target: indMapping.get(relationship.endNodeElementId) };
            });

            let simulation = forceSimulation(sim_nodes)
                .force('charge', forceManyBody().strength(-10000))
                .force('center', forceCenter(0, 0))
                .force('link', forceLink()
                    .links(sim_links)).on('end', () => {
                        setNodes(node_data.map((node, i) => {

                            return {
                                id: node.elementId,
                                data: { label: node.properties.address, type: node.labels[0], name: node.properties?.ContractName },
                                position: { x: sim_nodes[i].x, y: sim_nodes[i].y },
                                className: `${node.labels[0] === 'USER' ? styles.userNode : styles.contractNode} ${styles.accountNode}`,
                                type: 'account',
                                selected: node.properties.address === searchText ? true : false
                            }
                        }));
                        setEdges(relationship_data.map((relationship, i) => {
                            return {
                                id: relationship.elementId, source: relationship.startNodeElementId, target: relationship.endNodeElementId, type: 'floating', markerEnd: {
                                    type: MarkerType.Arrow,
                                }, data: { type: relationship.type }
                            }
                        }));
                    });
        }
        getUsers();
    }, [searchText])

    return <ReactFlow
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
    />

}

export default Graph;