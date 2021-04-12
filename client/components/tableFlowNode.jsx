import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';
// import TestNodeRow from './testNodeRow';
import TableContents from './tableContents';
import TableContainer from './tableContainer';

export default memo(({ data }) => {
  const { diagramState } = useContext(DiagramContext);
  /*
  const tableNode = Object.keys(diagramState.dbContentsRev).map((table) => (
    <TableContainer key={table} index={table} />
  ));
  */

  // conditional because for some reason the array is undefined for the first two logs?? brute forcing it ...
  const { tableName, columns } = data;

  let tableColumns;
  columns
    ? (tableColumns = columns.map((column) => <p>{column}</p>))
    : tableColumns;

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div>
        table name from tableFlowNode: <strong>{tableName}</strong>
        {/* <p>{data.columns}</p> */}
      </div>

      {tableColumns}
      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      {/* <TableContents /> */}
      {/* {tableNode} */}

      {/* <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
      /> */}
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
      />
    </>
  );
});
