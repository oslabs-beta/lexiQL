import React, { useState, useEffect, useCallback, useContext } from 'react';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  Controls,
  Background,
} from 'react-flow-renderer';

import TableNode from '../components/tableNode';
import { DiagramContext } from '../state/contexts';
// import './index.css';

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: TableNode,
};

const CustomNodeFlow = () => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);

  const { diagramState } = useContext(DiagramContext);

  useEffect(() => {
    setElements(diagramState.tableNodes);
  }, diagramState.tableNodes);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    [],
  );
  const onConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els),
      ),
    [],
  );

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance],
  );

  return (
    <ReactFlow
      id="reactFlow"
      // zoom properties
      minzoom={0.1}
      maxzoom={0.75}
      defaultzoom={0.4}
      // elements to be rendered
      elements={elements}
      // event handlers
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onLoad={onLoad}
      // style
      style={{ width: '100%', height: '90vh', fontSize: '20px' }}
      // custom node type
      nodeTypes={nodeTypes}
      // connection lines
      connectionLineStyle={connectionLineStyle}
    >
      <Background variant="dots" gap={12} size={0.5} />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
