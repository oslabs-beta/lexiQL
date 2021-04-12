import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';
import TableRow from './tableRow';
import TableName from './tableName';

// this file is basically a container for the rows

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

  // const rows = [];

  // for (let i = 0; i < 1; i++) {
  //   rows.push(<TableRow />);
  // }

  // for some reason this renders each row as the table name
  const rows2 = Object.keys(diagramState.dbContentsRev).map((table) => (
    <TableRow
      key={table}
      tableColumns={diagramState.dbContentsRev[table].columns}
      name={diagramState.dbContentsRev[table].tableName}
    />
  ));

  return <div>{rows2}</div>;
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
