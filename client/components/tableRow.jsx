import React, { useContext } from "react";
import { DiagramContext } from "../state/contexts";
import Row from "./row.jsx";

// probably want to create another component for each column in the row
// but for now just testing this

// create a row for each column in the table
// key, tableColumns, name
export default function tableRow({ columnName }) {
  const { diagramState } = useContext(DiagramContext);

<<<<<<< HEAD
  const tableContents = diagramState.dbContents;
  // console.log("diagramState.dbContents:", tableContents);
  console.log("diagramState.allTables", diagramState.allTables);
=======
  const tableContents = diagramState.dbContentsRev;
>>>>>>> visualizer-cleanup

  // [[TABLE1NAME, COLUMNS], [TABLE2NAME, COLUMNS]]
  // one loop - create all array for each table
  // second loop - populate each array

  // const rowsContainer = [];

<<<<<<< HEAD
  for (let i = 0; i < diagramState.allTables.length; i++) {
    const rows = [];
    const table = diagramState.allTables[i];
    for (let j = 0; j < table.length; j++) {
      // console.log("columnName:", table[j]);
      // rows.push(<Row key={j} columnName={table[j]} />);
      rows.push(table[j]);
    }
    rowsContainer.push(rows);
  }

  return (
    <div>
      {rowsContainer.map((table) => {
        console.log("table:", table);
        // return <div>{table}</div>;
        let currColumn = table.map((column) => {
          console.log("column:", column);
          <div>{column}</div>;
          return <p>{currColumn}</p>;
        });

        // return (
        //   <div>
        //     {currColumn}
        //     {/* {table.map((column) => (
        //       <p>{column}</p>
        //     ))} */}
        //   </div>
        // );
      })}
=======
  // for (let i = 0; i < diagramState.allTables.length; i++) {
  //   const rows = [];
  //   for (let j = 0; j < diagramState.allTables[i].length; j++) {
  //     rows.push(<p>{diagramState.allTables[i][j]}</p>);
  //   }
  //   rowsContainer.push(rows);
  // }

  // console.log('container in tableRow: ', rowsContainer);

  /*
  const rows = diagramState.dbContentsRev[key].columns.map((column) => (
    <p>{column}</p>
  ));
  */

  // const rows = tableColumns.map((column) => <p>{column}</p>);

  return (
    <div>
      <p>from table row</p>
      {/* {name} */}
      {/* {rows} */}
      {columnName}
>>>>>>> visualizer-cleanup
    </div>
  );
}
