import React, { useContext } from "react";
import { DiagramContext } from "../state/contexts";
import Row from "./row.jsx";

// probably want to create another component for each column in the row
// but for now just testing this

// create a row for each column in the table

export default function tableRow() {
  const { diagramState } = useContext(DiagramContext);

  const tableContents = diagramState.dbContents;
  // console.log("diagramState.dbContents:", tableContents);
  console.log("diagramState.allTables", diagramState.allTables);

  // [[TABLE1NAME, COLUMNS], [TABLE2NAME, COLUMNS]]
  // one loop - create all array for each table
  // second loop - populate each array

  const rowsContainer = [];

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
    </div>
  );
}
