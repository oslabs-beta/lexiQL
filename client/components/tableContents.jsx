import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';
import TableRow from './tableRow';

// probably want to create another component for each column in the row
// but for now just testing this

const tableContents = () => {
  const { diagramState } = useContext(DiagramContext);
  // for pushing the columns when we create that component
  // const columns = [];
  /*
    for (let i = 0; i < 2; i++) {
      //console.log(this.props)
      columns.push(
        <div key={`divKey${i}`}>
          <Column
            id={this.props.id + i}
            handleClick={this.props.handleClick}
            shape={this.props.shape}
          />
        </div>,
      );
    }
    

    return <section id="columnContainer">{columns}</section>;
    */

  const rows = [];

  // hard coded to test just for the first table
  // for (let i = 0; i < 4; i++) {
  //   rows.push(
  //     //   <div key={`divKey${tableContents[0]}${i}`}>

  //     // </div>,
  //     <TableRow />,
  //   );
  // }

  for (let i = 0; i < 2; i++) {
    rows.push(
      //   <div key={`divKey${tableContents[0]}${i}`}>

      // </div>,
      <TableRow />,
    );
  }

  return (
    <div>
      <h1>TESTINGG: </h1>
      {rows}
    </div>
  );
};

/*
const TableRow = () => (

  <div className="tableRow">

    <h4>

    </h4>
  </div>
);

export default TableRow;
*/

export default tableContents;
