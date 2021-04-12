import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';

// probably want to create another component for each column in the row
// but for now just testing this

// create a row for each column in the table

export default function tableName({ key, columns, name }) {
  const { diagramState } = useContext(DiagramContext);

  const tableContents = diagramState.dbContentsRev;

  // [[TABLE1NAME, COLUMNS], [TABLE2NAME, COLUMNS]]
  // one loop - create all array for each table
  // second loop - populate each array

  // const rowsContainer = [];

  // for (let i = 0; i < diagramState.allTables.length; i++) {
  //   const rows = [];
  //   for (let j = 0; j < diagramState.allTables[i].length; j++) {
  //     rows.push(<p>{diagramState.allTables[i][j]}</p>);
  //   }
  //   rowsContainer.push(rows);
  // }

  // console.log('container in tableRow: ', rowsContainer);

  /*
  const rows = diagramState.dbContentsRev[0].columns.map((column) => (
    <p>{column}</p>
  ));
  */

  return (
    <div>
      <p>From Table Name</p>
      {name}
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
