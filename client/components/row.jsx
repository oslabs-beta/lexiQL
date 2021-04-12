import React, { useContext } from "react";
import { DiagramContext } from "../state/contexts";

// probably want to create another component for each column in the row
// but for now just testing this

// create a row for each column in the table

export default function row({ columnName }) {
  const { diagramState } = useContext(DiagramContext);

  return (
    <div>
      <p>{columnName}</p>
    </div>
  );
}
