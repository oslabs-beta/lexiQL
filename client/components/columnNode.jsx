import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';

export default memo(({ columnName, dataType, id, tableName }) => {
  const { diagramState } = useContext(DiagramContext);

  // object of tables and their respective columns that have source and/or target handles
  // (i.e., does not include columns that don't have handles)
  const colHandles = diagramState.hasHandles;

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
      id={`${id}`}
      style={{
        position: 'relative',
        background: '#ff9149',
        float: 'left',
        left: '0%',
        width: `15px`,
        height: `15px`,
      }}
    />
  );

  const sourceHandle = (
    <Handle
      type="source"
      position="right"
      id={`${id}`}
      style={{
        position: 'relative',
        background: '#ff9149',
        float: 'right',
        left: '250',
        width: `15px`,
        height: `15px`,
      }}
    />
  );

  console.log('colHandles inside columnNode: ', colHandles);
  // render source, target, or no handles accordingly
  for (const table in colHandles) {
    if (colHandles[tableName].sourceHandles) {
      if (colHandles[tableName].sourceHandles.includes(columnName)) {
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
      } else if (colHandles[tableName].targetHandles) {
        if (colHandles[tableName].targetHandles.includes(columnName)) {
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
      } else {
        return noHandles;
      }
    } else if (colHandles[tableName].targetHandles) {
      if (colHandles[tableName].targetHandles.includes(columnName)) {
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
    } else {
      return noHandles;
    }
  }
});
