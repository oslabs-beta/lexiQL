import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

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
  if (!colHandles[tableName]) {
    return noHandles;
  } else if (
    colHandles[tableName].sourceHandles &&
    colHandles[tableName].sourceHandles.includes(columnName)
  ) {
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
  } else if (
    colHandles[tableName].targetHandles &&
    colHandles[tableName].targetHandles.includes(columnName)
  ) {
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
    return noHandles;
  }
});
