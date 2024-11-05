import React, { createContext, useContext, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface BlockData {
  [key: string]: any;
}

export interface Block {
  id: string;
  type: 'message' | 'delay' | 'decision' | 'input' | 'end';
  position: Position;
  data: BlockData;
}

interface Connection {
  from: string;
  to: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FlowContextType {
  blocks: Block[];
  connections: Connection[];
  selectedBlock: Block | null;
  addBlock: (block: Block) => void;
  updateBlock: (id: string, block: Block) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (block: Block | null) => void;
  addConnection: (connection: Connection) => void;
  moveBlock: (id: string, position: Position) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const addBlock = (block: Block) => {
    setBlocks((prev) => [...prev, block]);
  };

  const updateBlock = (id: string, updatedBlock: Block) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? updatedBlock : block))
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    setConnections((prev) => 
      prev.filter((conn) => conn.from !== id && conn.to !== id)
    );
    setSelectedBlock(null);
  };

  const selectBlock = (block: Block | null) => {
    setSelectedBlock(block);
  };

  const addConnection = (connection: Connection) => {
    setConnections((prev) => [...prev, connection]);
  };

  const moveBlock = (id: string, position: Position) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, position } : block
      )
    );
  };

  return (
    <FlowContext.Provider
      value={{
        blocks,
        connections,
        selectedBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        selectBlock,
        addConnection,
        moveBlock,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}