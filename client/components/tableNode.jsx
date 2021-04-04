import React, { Fragment, useContext } from 'react';
import ReactFlow, { addEdge, Background } from 'react-flow-renderer';
import { DiagramContext } from '../state/contexts';

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

export default function tableNode() {
  const { diagramState } = useContext(DiagramContext);

  // this lets you connect to other nodes
  const onConnect = (params) => setElements((e) => addEdge(params, e));

  return (
    <Fragment>
      <ReactFlow
        minzoom={0.3}
        maxzoom={0.7}
        defaultzoom={0.5}
        // zoomOnScroll={zoomOnScroll}
        elements={diagramState.tableNodes}
        onLoad={onLoad}
        style={{ width: '100%', height: '90vh' }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#888" gap={16} />
      </ReactFlow>
    </Fragment>
  );
}
