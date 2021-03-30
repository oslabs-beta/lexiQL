import React, { useContext } from 'react';
// import Visualizer from '../visualizer/Visualizer';
import Table from '../visualizer/Table';
import TableNode from '../components/tableNode';
import { VisualizerContext } from '../state/contexts';

export default function visualizerContainer() {
  return (
    <div className="visualizerContainer">
      <h1>Visualizer will go here</h1>
      {/* <Table /> */}
      {/* <Visualizer /> */}
      <TableNode />
    </div>
  );
}
