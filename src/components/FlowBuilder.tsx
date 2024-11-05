import React from 'react';
import { useFlow } from '../context/FlowContext';
import { FlowBlock } from './FlowBlock';

export function FlowBuilder() {
  const { blocks, connections, selectedBlock, selectBlock } = useFlow();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectBlock(null);
    }
  };

  return (
    <div className="h-full overflow-hidden bg-white">
      <div 
        className="flow-canvas h-full w-full relative p-8" 
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
        onClick={handleCanvasClick}
      >
        {blocks.map((block) => (
          <FlowBlock
            key={block.id}
            block={block}
            isSelected={selectedBlock?.id === block.id}
          />
        ))}
        <svg className="absolute inset-0 pointer-events-none">
          {connections.map((connection) => (
            <path
              key={`${connection.from}-${connection.to}`}
              d={`M ${connection.startX} ${connection.startY} C ${connection.startX + 100} ${connection.startY}, ${connection.endX - 100} ${connection.endY}, ${connection.endX} ${connection.endY}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}