import React, { memo, useContext } from 'react';
import { Handle } from 'react-flow-renderer';

import { DiagramContext } from '../state/contexts';

export default memo(({ columnName, dataType, id, tableName }) => {
  const { diagramState } = useContext(DiagramContext);

  const colHandles = diagramState.hasHandles;
  // only render target/source nodes as needed

  for (const table in colHandles) {
    if (colHandles[tableName].sourceHandles) {
      if (colHandles[tableName].sourceHandles.includes(columnName)) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
              <Handle
                type="source"
                position="right"
                id={`${id}`}
                style={{
                  position: 'relative',
                  background: 'blue',
                  float: 'right',
                  left: '250',
                  width: `10px`,
                  height: `10px`,
                }}
              />
            </div>
          </div>
        );
      } else if (colHandles[tableName].targetHandles) {
        if (colHandles[tableName].targetHandles.includes(columnName)) {
          return (
            <div className="columnDotContainer">
              <div className="leftColumn">
                <Handle
                  type="target"
                  position="left"
                  id={`${id}`}
                  style={{
                    position: 'relative',
                    background: 'orange',
                    float: 'left',
                    left: '0%',
                    width: `10px`,
                    height: `10px`,
                  }}
                />
                <div className="columnName">{columnName}</div>
              </div>
              <div className="rightColumn">
                <div className="dataType">{dataType}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="columnDotContainer">
              <div className="leftColumn">
                <div className="columnName">{columnName}</div>
              </div>
              <div className="rightColumn">
                <div className="dataType">{dataType}</div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
            </div>
          </div>
        );
      }
    } else if (colHandles[tableName].targetHandles) {
      if (colHandles[tableName].targetHandles.includes(columnName)) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <Handle
                type="target"
                position="left"
                id={`${id}`}
                style={{
                  position: 'relative',
                  background: 'orange',
                  float: 'left',
                  left: '0%',
                  width: `10px`,
                  height: `10px`,
                }}
              />
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <div className="columnName">{columnName}</div>
          </div>
          <div className="rightColumn">
            <div className="dataType">{dataType}</div>
          </div>
        </div>
      );
    }
  }
});

/*
for (const table in colHandles) {
    if (
      colHandles[tableName].targetHandles ||
      colHandles[tableName].sourceHandles
    ) {
      if (
        colHandles[tableName].targetHandles.includes(columnName) &&
        colHandles[tableName].sourceHandles.includes(columnName)
      ) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <Handle
                type="target"
                position="left"
                id={`${id}`}
                style={{
                  position: 'relative',
                  background: 'orange',
                  float: 'left',
                  left: '0%',
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
                  position: 'relative',
                  background: 'blue',
                  float: 'right',
                  left: '250',
                  width: `10px`,
                  height: `10px`,
                }}
              />
            </div>
          </div>
        );
      } else if (colHandles[tableName].targetHandles.includes(columnName) &) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <Handle
                type="target"
                position="left"
                id={`${id}`}
                style={{
                  position: 'relative',
                  background: 'orange',
                  float: 'left',
                  left: '0%',
                  width: `10px`,
                  height: `10px`,
                }}
              />
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
            </div>
          </div>
        );
      } else if (colHandles[tableName].sourceHandles.includes(columnName)) {
        return (
          <div className="columnDotContainer">
            <div className="leftColumn">
              <div className="columnName">{columnName}</div>
            </div>
            <div className="rightColumn">
              <div className="dataType">{dataType}</div>
              <Handle
                type="source"
                position="right"
                id={`${id}`}
                style={{
                  position: 'relative',
                  background: 'blue',
                  float: 'right',
                  left: '250',
                  width: `10px`,
                  height: `10px`,
                }}
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <div className="columnName">{columnName}</div>
          </div>
          <div className="rightColumn">
            <div className="dataType">{dataType}</div>
          </div>
        </div>
      );
    }
  }
});
*/

/*
export default memo(({ columnName, dataType, id, tableName }) => {
  const { diagramState } = useContext(DiagramContext);

  const colHandles = diagramState.hasHandles;
  // only render target/source nodes as needed
  for (const table in colHandles) {
    if (
      colHandles[tableName].targetHandles.includes(columnName) &&
      colHandles[tableName].sourceHandles.includes(columnName)
    ) {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <Handle
              type="target"
              position="left"
              id={`${id}`}
              style={{
                position: 'relative',
                background: 'orange',
                float: 'left',
                left: '0%',
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
                position: 'relative',
                background: 'blue',
                float: 'right',
                left: '250',
                width: `10px`,
                height: `10px`,
              }}
            />
          </div>
        </div>
      );
    } else if (colHandles[tableName].targetHandles.includes(columnName)) {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <Handle
              type="target"
              position="left"
              id={`${id}`}
              style={{
                position: 'relative',
                background: 'orange',
                float: 'left',
                left: '0%',
                width: `10px`,
                height: `10px`,
              }}
            />
            <div className="columnName">{columnName}</div>
          </div>
          <div className="rightColumn">
            <div className="dataType">{dataType}</div>
          </div>
        </div>
      );
    } else if (colHandles[tableName].sourceHandles.includes(columnName)) {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <div className="columnName">{columnName}</div>
          </div>
          <div className="rightColumn">
            <div className="dataType">{dataType}</div>
            <Handle
              type="source"
              position="right"
              id={`${id}`}
              style={{
                position: 'relative',
                background: 'blue',
                float: 'right',
                left: '250',
                width: `10px`,
                height: `10px`,
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="columnDotContainer">
          <div className="leftColumn">
            <div className="columnName">{columnName}</div>
          </div>
          <div className="rightColumn">
            <div className="dataType">{dataType}</div>
          </div>
        </div>
      );
    }
  }
});
*/

// import React, { memo, useContext } from 'react';
// import { Handle } from 'react-flow-renderer';

// import { DiagramContext } from '../state/contexts';

// export default memo(({ columnName, dataType, id, tableName }) => {
//   const { diagramState } = useContext(DiagramContext);

//   let columnNode;
//   const colHandles = diagramState.hasHandles
//   // only render target/source nodes as needed
//   for (const table in colHandles) {
//     if (colHandles[tableName].targetHandles && colHandles[tableName].sourceHandles) {
//       columnNode = (<div className="leftColumn">
//         <Handle
//           type="target"
//           position="left"
//           id={`${id}`}
//           style={{
//             position: 'relative',
//             background: 'orange',
//             float: 'left',
//             left: '0%',
//             width: `10px`,
//             height: `10px`,
//           }}
//         />
//         <div className="columnName">{columnName}</div>
//       </div>
//       <div className="rightColumn">
//         <div className="dataType">{dataType}</div>
//         <Handle
//           type="source"
//           position="right"
//           id={`${id}`}
//           style={{
//             position: 'relative',
//             background: 'blue',
//             float: 'right',
//             left: '250',
//             width: `10px`,
//             height: `10px`,
//           }}
//         />
//       </div>)
//     } else if (colHandles[tableName].targetHandles) {
//       columnNode = (<div className="leftColumn">
//       <Handle
//         type="target"
//         position="left"
//         id={`${id}`}
//         style={{
//           position: 'relative',
//           background: 'orange',
//           float: 'left',
//           left: '0%',
//           width: `10px`,
//           height: `10px`,
//         }}
//       />
//       <div className="columnName">{columnName}</div>
//     </div>
//     <div className="rightColumn">
//       <div className="dataType">{dataType}</div>
//     </div>)
//     } else if (colHandles[tableName].sourceHandles) {
//       columnNode = (<div className="leftColumn">
//       <div className="columnName">{columnName}</div>
//     </div>
//     <div className="rightColumn">
//       <div className="dataType">{dataType}</div>
//       <Handle
//         type="source"
//         position="right"
//         id={`${id}`}
//         style={{
//           position: 'relative',
//           background: 'blue',
//           float: 'right',
//           left: '250',
//           width: `10px`,
//           height: `10px`,
//         }}
//       />
//     </div>)
//     } else {
//       columnNode = (<div className="leftColumn">
//       <div className="columnName">{columnName}</div>
//     </div>
//     <div className="rightColumn">
//       <div className="dataType">{dataType}</div>
//     </div>)
//     }
//   }

//   return (
//     <div className="columnDotContainer">
//       {columnNode}
//       {/* <div className="leftColumn">
//         <Handle
//           type="target"
//           position="left"
//           id={`${id}`}
//           style={{
//             position: 'relative',
//             background: 'orange',
//             float: 'left',
//             left: '0%',
//             width: `10px`,
//             height: `10px`,
//           }}
//         />
//         <div className="columnName">{columnName}</div>
//       </div>
//       <div className="rightColumn">
//         <div className="dataType">{dataType}</div>
//         <Handle
//           type="source"
//           position="right"
//           id={`${id}`}
//           style={{
//             position: 'relative',
//             background: 'blue',
//             float: 'right',
//             left: '250',
//             width: `10px`,
//             height: `10px`,
//           }}
//         />
//       </div> */}
//     </div>
//   );
// });
