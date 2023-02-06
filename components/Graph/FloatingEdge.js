import { useCallback } from 'react';
import { useStore, getStraightPath, EdgeLabelRenderer } from 'reactflow';
import { getEdgeParams } from './utils.js';

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
      <div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          background: '#FFFFFF',
          padding: 10,
          borderRadius: 5,
          fontSize: 12,
          fontWeight: 700,
        }}
        className="nodrag nopan"
      >
        {data.type}
      </div>
    </EdgeLabelRenderer>


  </>;
}

export default FloatingEdge;
