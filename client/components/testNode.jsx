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
          position="leftt"
          id="b"
          style={{
            background: 'red',
            float: 'left',

            width: `32px`,
            height: `32px`,
          }}
        />
        testNode: <strong>{columnName}</strong>
        <Handle
          type="source"
          // position="right"
          id="b"
          style={{
            background: 'blue',
            float: 'right',

            width: `32px`,
            height: `32px`,
          }}
        />
      </div>
    </div>
  );
});
