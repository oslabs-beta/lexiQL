import React from 'react';

const ReactFlow = ({ children }) => (
  <div data-testid="react-flow-mock" style={{ width: 800, height: 600 }}>
    {children}
  </div>
);

export const Background = () => <div data-testid="rf-background" />;
export const Controls = () => <div data-testid="rf-controls" />;
export default ReactFlow;
