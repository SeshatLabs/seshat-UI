import { useCallback } from 'react';
import { useStore, getStraightPath, EdgeLabelRenderer } from 'reactflow';
import { getEdgeParams } from './utils.js';
import { Box, Popover, PopoverContent, PopoverTrigger, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import styles from './Graph.module.css'

function FloatingEdge({ id, source, target, markerEnd, style, data }) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return <>
    <path
      id={id}
      className={"react-flow__edge-path"}
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    >
    </path>
    <EdgeLabelRenderer>
      <Popover >
        <PopoverTrigger>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#FFFFFF',
              padding: 10,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              pointerEvents: 'all',
              borderColor: `${data.hovered ? '#f15913' : '#805AD5'}`,
              borderStyle: 'solid',
              borderWidth: '2px'
            }}
            className="nodrag nopan"
          >
            {data.label}
          </div>
        </PopoverTrigger>
        <Box zIndex="popover">
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Details:</PopoverHeader>
            <PopoverBody>
              Transaction ID: {id} <br></br>
              Function Signature: {data.properties.interaction?.function_signature}<br></br>
              Interpretation: {data.properties.interpretation}
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Popover>
    </EdgeLabelRenderer>
  </>

}

export default FloatingEdge;
