import React, { useState, Fragment, useContext } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import { VisualizerContext } from '../state/contexts';

// const initialElements = [
//   { id: '1', type: 'input', data: { label: 'Node' }, position: { x: 0, y: 0 } },
// ];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

export default function tableNode() {
  const { visualizerState } = useContext(VisualizerContext);

  // this lets you connect to other nodes
  const onConnect = (params) => setElements((e) => addEdge(params, e));

  return (
    <Fragment>
      <ReactFlow
        minzoom={0.3}
        maxzoom={0.7}
        defaultzoom={.5}
        // zoomOnScroll={zoomOnScroll}
        elements={visualizerState.tableNodes}
        onLoad={onLoad}
        style={{ width: '100%', height: '90vh' }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#888" gap={16} />
        {/* 
        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'input') return 'blue';
            return '#FFCC00';
          }}
        /> */}
      </ReactFlow>
    </Fragment>
  );
}
