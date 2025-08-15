import React, { useState, useEffect, useContext } from 'react';

import ReactFlow, { Controls, Background } from 'react-flow-renderer';

import TableNode from '../components/tableNode';
import ColumnHandleNode from '../components/columnHandleNode';
import { DiagramContext } from '../state/contexts';

const connectionLineStyle = { stroke: '#ff9149', strokeWidth: 2 };
const nodeTypes = {
  selectorNode: TableNode,
  columnHandleNode: ColumnHandleNode,
};

const CustomNodeFlow = () => {
  const [elements, setElements] = useState([]);

  const { diagramState } = useContext(DiagramContext);

  useEffect(() => {
    if (diagramState.tableNodes && diagramState.tableNodes.length > 0) {
      setElements(diagramState.tableNodes);
    }
  }, [diagramState.tableNodes]);

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      {elements.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '18px',
            color: '#666',
          }}
        >
          {diagramState.tableNodes && diagramState.tableNodes.length > 0
            ? 'Processing database schema...'
            : 'No database schema loaded. Please use the sample database or input your own database URI.'}
        </div>
      ) : (
        <ReactFlow
          minzoom={0.001}
          maxzoom={2}
          elements={elements}
          style={{ width: '100%', height: '90vh', fontSize: '20px' }}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          snapGrid={[0, 0]}
          fitView={true}
          fitViewOptions={{
            padding: 0.5,
            minZoom: 0.05,
            maxZoom: 0.2,
          }}
        >
          <Background variant="dots" gap={12} size={0.5} />
          <Controls />
        </ReactFlow>
      )}
    </div>
  );
};

export default CustomNodeFlow;
