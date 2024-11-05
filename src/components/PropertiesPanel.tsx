import React from 'react';
import { useFlow } from '../context/FlowContext';
import { Settings2, Clock, GitFork, UserSquare2, Square } from 'lucide-react';

interface BlockProperty {
  label: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

const blockProperties: Record<string, BlockProperty[]> = {
  message: [
    { label: 'Message Text', type: 'text' },
    { label: 'Dynamic Variables', type: 'select', options: ['{{user_name}}', '{{email}}', '{{phone}}'] }
  ],
  delay: [
    { label: 'Delay (seconds)', type: 'number' }
  ],
  decision: [
    { label: 'Condition', type: 'text' },
    { label: 'Yes Keywords', type: 'text' },
    { label: 'No Keywords', type: 'text' }
  ],
  input: [
    { label: 'Input Label', type: 'text' },
    { label: 'Variable Name', type: 'text' }
  ],
  end: []
};

const blockIcons = {
  message: Settings2,
  delay: Clock,
  decision: GitFork,
  input: UserSquare2,
  end: Square
};

export function PropertiesPanel() {
  const { selectedBlock, updateBlock } = useFlow();

  if (!selectedBlock) {
    return (
      <div className="w-80 border-l border-gray-200 p-4 bg-white">
        <p className="text-gray-500 text-center">Select a block to view properties</p>
      </div>
    );
  }

  const properties = blockProperties[selectedBlock.type] || [];
  const Icon = blockIcons[selectedBlock.type as keyof typeof blockIcons];

  const handlePropertyChange = (property: string, value: string | number) => {
    if (selectedBlock) {
      const newData = {
        ...selectedBlock.data,
        [property]: value
      };
      
      updateBlock(selectedBlock.id, {
        ...selectedBlock,
        data: newData
      });
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 p-4 bg-white">
      <div className="flex items-center gap-2 mb-6">
        {Icon && <Icon className="w-5 h-5 text-gray-600" />}
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)} Block
        </h2>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.label} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {property.label}
            </label>
            {property.type === 'select' ? (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedBlock.data[property.label] || ''}
                onChange={(e) => handlePropertyChange(property.label, e.target.value)}
              >
                <option value="">Select a variable</option>
                {property.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : property.type === 'number' ? (
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedBlock.data[property.label] || ''}
                onChange={(e) => handlePropertyChange(property.label, parseFloat(e.target.value) || 0)}
              />
            ) : (
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedBlock.data[property.label] || ''}
                onChange={(e) => handlePropertyChange(property.label, e.target.value)}
                placeholder={`Enter ${property.label.toLowerCase()}...`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}