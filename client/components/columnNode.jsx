import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';

export default memo(({ columnName, dataType, id, tableName, hasHandles }) => {
  // object of tables and their respective columns that have source and/or target handles
  // (i.e., does not include columns that don't have handles)
  const colHandles = hasHandles;

  const noHandles = (
    <div className="columnDotContainer">
      <div className="leftColumn">
        <div className="noNodeColumnName">{columnName}</div>
      </div>
      <div className="rightColumn">
        <div className="noNodeDataType">{dataType}</div>
      </div>
    </div>
  );

  const targetHandle = (
    <Handle
      type="target"
      position="left"
      id={`${tableName}-${id}`}
      style={{
        background: '#ff9149',
        width: '15px',
        height: '15px',
      }}
    />
  );

  const sourceHandle = (
    <Handle
      type="source"
      position="right"
      id={`${tableName}-${id}`}
      style={{
        background: '#ff9149',
        width: '15px',
        height: '15px',
      }}
    />
  );

  // render source, target, or no handles accordingly
  console.log(`ColumnNode: tableName=${tableName}, columnName=${columnName}, colHandles=`, colHandles);
  console.log(`ColumnNode: Checking if ${columnName} is in sourceHandles:`, colHandles[tableName]?.sourceHandles);
  console.log(`ColumnNode: Checking if ${columnName} is in targetHandles:`, colHandles[tableName]?.targetHandles);
  if (!colHandles[tableName]) {
    console.log(`ColumnNode: No handles for table ${tableName}`);
    return noHandles;
  } else if (colHandles[tableName].sourceHandles && colHandles[tableName].sourceHandles.includes(columnName)) {
    console.log(`ColumnNode: Creating source handle for ${tableName}.${columnName} with ID: ${tableName}-${id}`);
    return (
      <div className="columnDotContainer">
        <div className="leftColumn">
          <div className="sourceColumnName">{columnName}</div>
        </div>
        <div className="rightColumn">
          <div className="sourceDataType">{dataType}</div>
          <div className="sourceDot">{sourceHandle}</div>
        </div>
      </div>
    );
  } else if (colHandles[tableName].targetHandles && colHandles[tableName].targetHandles.includes(columnName)) {
    console.log(`ColumnNode: Creating target handle for ${tableName}.${columnName} with ID: ${tableName}-${id}`);
    return (
      <div className="columnDotContainer">
        <div className="leftColumn">
          {targetHandle}
          <div className="targetColumnName">{columnName}</div>
        </div>
        <div className="rightColumn">
          <div className="targetDataType">{dataType}</div>
        </div>
      </div>
    );
  } else {
    console.log(`ColumnNode: No handle for ${tableName}.${columnName}`);
    return noHandles;
  }
});
