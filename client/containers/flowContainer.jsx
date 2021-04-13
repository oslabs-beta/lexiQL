import React, { useState, useEffect, useCallback, useContext } from 'react';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
} from 'react-flow-renderer';

import TableNode from '../components/tableNode';
import { DiagramContext } from '../state/contexts';
// import './index.css';

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);

// const initBgColor = '#9593AE';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: TableNode,
};

const CustomNodeFlow = () => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  // const [bgColor, setBgColor] = useState(initBgColor);

  const { diagramState } = useContext(DiagramContext);

  // do this once the tableNodes has changed
  useEffect(() => {
    // const onChange = (event) => {
    //   setElements((els) =>
    //     els.map((e) => {
    //       if (isEdge(e) || e.id !== '2') {
    //         return e;
    //       }

    //       const color = event.target.value;

    //       setBgColor(color);

    //       return {
    //         ...e,
    //         data: {
    //           ...e.data,
    //           color,
    //         },
    //       };
    //     }),
    //   );
    // };

    setElements(diagramState.tableNodes);
  }, diagramState.tableNodes);

  //   setElements([
  //     {
  //       id: '1',
  //       type: 'input',
  //       data: { label: 'An input node' },
  //       position: { x: 0, y: 50 },
  //       sourcePosition: 'right',
  //     },

  //     {
  //       id: '2',
  //       type: 'selectorNode',
  //       data: { onChange: onChange, color: initBgColor },
  //       style: { border: '1px solid #777', padding: 10 },
  //       position: { x: 300, y: 50 },
  //     },
  //     {
  //       id: '3',
  //       type: 'output',
  //       data: { label: 'Output A' },
  //       position: { x: 650, y: 25 },
  //       targetPosition: 'left',
  //     },
  //     {
  //       id: '4',
  //       type: 'output',
  //       data: { label: 'Output B' },
  //       position: { x: 650, y: 100 },
  //       targetPosition: 'left',
  //     },

  //     {
  //       id: 'e1-2',
  //       source: '1',
  //       target: '2',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //     {
  //       id: 'e2a-3',
  //       source: '2',
  //       target: '3',
  //       sourceHandle: 'a',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //     {
  //       id: 'e2b-4',
  //       source: '2',
  //       target: '4',
  //       sourceHandle: 'b',
  //       animated: true,
  //       style: { stroke: '#fff' },
  //     },
  //   ]);
  // }, []);

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
      // zoomOnScroll={zoomOnScroll}
      // zoomOnDoubleClick={zoomOnDoubleClick}
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
      {/* <Background variant="dots" gap={16} /> */}
      {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === "input") return "#0041d0";
          if (n.type === "selectorNode") return bgColor;
          if (n.type === "output") return "#ff0072";
        }}
        nodeColor={(n) => {
          if (n.type === "selectorNode") return bgColor;
          return "#fff";
        }}
      /> */}
      {/* <Background variant="dots" gap={12} size={4} /> */}
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
