import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';
// import TestNodeRow from './testNodeRow';
import TableContents from './tableContents';
import TableContainer from './tableContainer';

// testing to see if tableFlowNode can render testNode

export default memo(({ data, columnName }) => {
  const { diagramState } = useContext(DiagramContext);

  return (
    <div className="columnDotContainer">
      <div className="leftColumn">
        <Handle
          type="target"
          position="left"
          id="b"
          style={{
            position: 'relative',
            background: 'orange',
            float: 'left',
            left: '0%',
            width: `10px`,
            height: `10px`,
          }}
        />
        <div className="columnName">{columnName}</div>
      </div>
      <div className="rightColumn">
        <Handle
          type="source"
          position="right"
          id="b"
          style={{
            position: 'relative',
            background: 'blue',
            float: 'right',
            left: '250',
            width: `10px`,
            height: `10px`,
          }}
        />
      </div>
    </div>
  );
});
