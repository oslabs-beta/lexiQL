import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';

// probably want to create another component for each column in the row
// but for now just testing this

export default function tableRow() {
  const { diagramState } = useContext(DiagramContext);

  const tableContents = diagramState.testNodes[0];
  // [[TABLE1NAME, COLUMNS], [TABLE2NAME, COLUMNS]]
  // one loop - create all array for each table
  // second loop - populate each array

  return (
    <div>
      <p>{tableContents[0]}</p>
      <p>{tableContents[1]}</p>
      <p>{tableContents[2]}</p>
      <p>{tableContents[3]}</p>
    </div>
  );
  // REFACTOR
  /*
  const rows = [];

  // hard coded to test just for the first table
  for (let i = 0; i < tableContents.length; i++) {
    rows.push(
      //   <div key={`divKey${tableContents[0]}${i}`}>

      // </div>,
      <div>{tableContents[i]}</div>,
    );
  }
  return rows;
  */
}

/*
const TableRow = () => (

  <div className="tableRow">

    <h4>

    </h4>
  </div>
);

export default TableRow;
*/

// export default TestNodeRow;
