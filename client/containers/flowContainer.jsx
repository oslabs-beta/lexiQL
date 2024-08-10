import React, { useState, useEffect, useContext } from 'react';

import ReactFlow, { Controls, Background } from 'react-flow-renderer';

import TableNode from '../components/tableNode';
import { DiagramContext } from '../state/contexts';

const connectionLineStyle = { stroke: '#fff' };
const nodeTypes = {
  selectorNode: TableNode,
};

const CustomNodeFlow = () => {
  const [elements, setElements] = useState([]);

  const { diagramState } = useContext(DiagramContext);

  useEffect(() => {
    setElements(diagramState.tableNodes);
  }, diagramState.tableNodes);

  return (
    <ReactFlow
      minzoom={0.1}
      maxzoom={2}
      defaultzoom={1.5}
      defaultPosition={[-50, -50]}
      elements={elements}
      style={{ width: '100%', height: '90vh', fontSize: '20px' }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapGrid={[0, 0]}
    >
      <Background variant='dots' gap={12} size={0.5} />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
