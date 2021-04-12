import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';
import ColumnNode from './columnNode';

export default memo(({ data }) => {
  const { tableName, columns } = data;

  /*
  // conditional because for some reason the array is undefined for the first two logs?? brute forcing it ...
*/
  let tableColumns;
  columns
    ? (tableColumns = columns.map((column) => (
        <ColumnNode columnName={column} id={`${column}`} />
      )))
    : tableColumns;

  return (
    <>
      {/* <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      /> */}
      <div className="tableHeader">
        <strong>{tableName}</strong>
      </div>
      <br />
      {tableColumns}
      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />

      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
      /> */}
    </>
  );
});
