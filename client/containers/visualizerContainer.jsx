import React, { useContext } from "react";
import TableNode from "../components/tableNode";
import { VisualizerContext } from "../state/contexts";

export default function visualizerContainer() {
  return (
    <div className="visualizerContainer">
      <TableNode />
    </div>
  );
}
