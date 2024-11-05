import React, { createContext, useContext } from 'react';
import { useFlow } from './FlowContext';

interface ToolboxContextType {
  startDrag: (e: React.DragEvent, type: string) => void;
}

const ToolboxContext = createContext<ToolboxContextType | undefined>(undefined);

export function ToolboxProvider({ children }: { children: React.ReactNode }) {
  const { addBlock } = useFlow();

  const startDrag = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('blockType', type);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('blockType');
    if (!type) return;
    
    const canvas = document.querySelector('.flow-canvas');
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addBlock({
      id: `${type}-${Date.now()}`,
      type: type as any,
      position: { x, y },
      data: {},
    });
  };

  React.useEffect(() => {
    const canvas = document.querySelector('.flow-canvas');
    if (canvas) {
      canvas.addEventListener('drop', handleDrop);
      canvas.addEventListener('dragover', (e) => e.preventDefault());

      return () => {
        canvas.removeEventListener('drop', handleDrop);
        canvas.removeEventListener('dragover', (e) => e.preventDefault());
      };
    }
  }, []);

  return (
    <ToolboxContext.Provider value={{ startDrag }}>
      {children}
    </ToolboxContext.Provider>
  );
}

export function useToolbox() {
  const context = useContext(ToolboxContext);
  if (context === undefined) {
    throw new Error('useToolbox must be used within a ToolboxProvider');
  }
  return context;
}