import React, { Fragment, useContext } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { DiagramContext } from '../state/contexts';

// the contents of this file could probably just go into diagramContainer when refactoring

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

export default function tableNode() {
  const { diagramState } = useContext(DiagramContext);

  // this lets you connect to other nodes
  const onConnect = (params) => setElements((e) => addEdge(params, e));

  return (
    <Fragment>
      <ReactFlowProvider>
        <ReactFlow
          minzoom={0.3}
          maxzoom={0.7}
          defaultzoom={0.5}
          defaultPosition={[50, 50]}
          onLoad={onLoad}
          elements={diagramState.tableNodes}
          // fitView={{ padding: 2, includeHiddenNodes: true }}
          style={{ width: '100%', height: '90vh' }}
          onConnect={onConnect}
          connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
          connectionLineType="bezier"
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <Background variant="dots" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </Fragment>
  );
}
