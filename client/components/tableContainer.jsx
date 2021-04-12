import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';

// probably want to create another component for each column in the row
// but for now just testing this

// create a row for each column in the table

export default function tableContainer({ key, columns, name }) {
  const { diagramState } = useContext(DiagramContext);

  const tableContents = diagramState.dbContentsRev;

  // render one tableName component
  // render the tableContents (container of all the rows)

  return (
    <div>
      <p>Bye</p>
      {name}
    </div>
  );
}
