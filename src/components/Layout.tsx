import React from 'react';
import { Toolbar } from './Toolbar';
import { Toolbox } from './Toolbox';
import { PropertiesPanel } from './PropertiesPanel';
import { Save, Play, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">WhatsApp Flow Builder</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition-colors">
              <Play size={20} />
              Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition-colors">
              <Save size={20} />
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition-colors">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        <Toolbox />
        <main className="flex-1 relative">
          <Toolbar />
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <ZoomIn size={24} />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <ZoomOut size={24} />
            </button>
          </div>
          {children}
        </main>
        <PropertiesPanel />
      </div>
    </div>
  );
}