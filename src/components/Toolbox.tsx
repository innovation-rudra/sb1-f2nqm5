import React from 'react';
import { MessageSquare, Clock, GitBranch, FormInput, Square } from 'lucide-react';
import { useToolbox } from '../context/ToolboxContext';

const tools = [
  { id: 'message', icon: MessageSquare, label: 'Message', color: 'bg-emerald-100' },
  { id: 'delay', icon: Clock, label: 'Delay', color: 'bg-amber-100' },
  { id: 'decision', icon: GitBranch, label: 'Decision', color: 'bg-blue-100' },
  { id: 'input', icon: FormInput, label: 'Input', color: 'bg-purple-100' },
  { id: 'end', icon: Square, label: 'End', color: 'bg-red-100' },
];

export function Toolbox() {
  const { startDrag } = useToolbox();

  return (
    <div className="w-72 border-r bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Flow Elements</h2>
      <div className="space-y-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`${tool.color} p-3 rounded-lg cursor-move flex items-center gap-3 hover:opacity-90 transition-opacity`}
            draggable
            onDragStart={(e) => startDrag(e, tool.id)}
          >
            <tool.icon className="w-5 h-5" />
            <span className="font-medium">{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}