import React from 'react';
import { getBezierPath as getStraightPath } from 'reactflow';

import { getEdgeParams } from './utils.js';

function FloatingConnectionLine({ targetX, targetY, sourcePosition, targetPosition, sourceNode }) {
  if (!sourceNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    width: 1,
    height: 1,
    position: { x: targetX, y: targetY },
  };

  const { sx, sy } = getEdgeParams(sourceNode, targetNode);
  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <g>
      <path fill="none" stroke="#805AD5" strokeWidth={3} className="animated" d={edgePath} />
      <circle cx={targetX} cy={targetY} fill="#805AD5" r={3} stroke="#805AD5" strokeWidth={1.5} />
    </g>
  );
}

export default FloatingConnectionLine;
