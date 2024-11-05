import React from 'react';
import { Layout } from './components/Layout';
import { FlowBuilder } from './components/FlowBuilder';
import { ToolboxProvider } from './context/ToolboxContext';
import { FlowProvider } from './context/FlowContext';

function App() {
  return (
    <FlowProvider>
      <ToolboxProvider>
        <Layout>
          <FlowBuilder />
        </Layout>
      </ToolboxProvider>
    </FlowProvider>
  );
}

export default App;