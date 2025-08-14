import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  const { tableName, columnName, isSource, isTarget } = data;

  return (
    <div style={{ width: '20px', height: '20px' }}>
      {isSource && (
        <Handle
          type="source"
          position="right"
          id={`${tableName}-${columnName}`}
          style={{
            background: '#ff9149',
            width: '15px',
            height: '15px',
          }}
        />
      )}
      {isTarget && (
        <Handle
          type="target"
          position="left"
          id={`${tableName}-${columnName}`}
          style={{
            background: '#ff9149',
            width: '15px',
            height: '15px',
          }}
        />
      )}
    </div>
  );
});
