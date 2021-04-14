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
        background: 'orange',
        float: 'left',
        left: '0%',
        width: `10px`,
        height: `10px`,
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
        background: 'blue',
        float: 'right',
        left: '250',
        width: `10px`,
        height: `10px`,
      }}
    />
  );

  // render source, target, or no handles accordingly
  for (const table in colHandles) {
    if (colHandles[tableName].sourceHandles) {
      if (colHandles[tableName].sourceHandles.includes(columnName)) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
              {sourceHandle}
            </div>
          </div>
        );
      } else if (colHandles[tableName].targetHandles) {
        if (colHandles[tableName].targetHandles.includes(columnName)) {
          return (
            <div className="columnDotContainer">
              <div className="leftColumn">
                {targetHandle}
                <div className="columnName">{columnName}</div>
              </div>
              <div className="rightColumn">
                <div className="dataType">{dataType}</div>
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
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
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
