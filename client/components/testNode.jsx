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
    <div>
      <div>
        <Handle
          type="target"
          position="left"
          id="b"
          style={{
            position: 'relative',
            background: 'red',
            float: 'left',
            left: '0%',
            width: `24px`,
            height: `24px`,
          }}
        />
        <strong>{columnName}</strong>
        <Handle
          type="source"
          position="right"
          id="b"
          style={{
            position: 'relative',
            background: 'blue',
            float: 'right',
            left: '20%',
            width: `24px`,
            height: `24px`,
          }}
        />
      </div>
    </div>
  );
});
