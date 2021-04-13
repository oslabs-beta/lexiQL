import React, { memo, useContext } from "react";
import { Handle } from "react-flow-renderer";

import { DiagramContext } from "../state/contexts";

export default memo(({ columnName, dataType, id }) => {
  return (
    <div className="columnDotContainer">
      <div className="leftColumn">
        <Handle
          type="target"
          position="left"
          id={`${id}`}
          style={{
            position: "relative",
            background: "orange",
            float: "left",
            left: "0%",
            width: `10px`,
            height: `10px`,
          }}
        />
        <div className="columnName">{columnName}</div>
      </div>
      <div className="rightColumn">
        <div className="dataType">{dataType}</div>
        <Handle
          type="source"
          position="right"
          id={`${id}`}
          style={{
            position: "relative",
            background: "blue",
            float: "right",
            left: "250",
            width: `10px`,
            height: `10px`,
          }}
        />
      </div>
    </div>
  );
});
