import React from 'react';
import { Undo, Redo, Trash } from 'lucide-react';
import { useFlow } from '../context/FlowContext';

export function Toolbar() {
  const { selectedBlock, deleteBlock } = useFlow();

  return (
    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white rounded-lg shadow-sm border p-1">
      <button className="p-2 hover:bg-gray-100 rounded-lg" disabled>
        <Undo size={20} className="text-gray-400" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg" disabled>
        <Redo size={20} className="text-gray-400" />
      </button>
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <button
        className={`p-2 rounded-lg ${
          selectedBlock
            ? 'hover:bg-red-100 text-red-600'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        onClick={() => selectedBlock && deleteBlock(selectedBlock.id)}
        disabled={!selectedBlock}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}