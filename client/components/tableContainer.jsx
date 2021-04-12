import React, { useContext } from 'react';
import { DiagramContext } from '../state/contexts';
import TableRow from './tableRow';
import TableName from './tableName';
import TableContents from './tableContents';

const tableContainer = ({ index }) => {
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

  // render tableName
  // render all the columns within that tableName
  // const tableContents = Object.keys(diagramState.dbContentsRev).map((table) => (

  // ));

  return (
    <div>
      <TableName
        key={index}
        tableName={diagramState.dbContentsRev[index].tableName}
      />
      <TableContents
        key={index}
        index={index}
        tableColumns={diagramState.dbContentsRev[index].columns}
      />
    </div>
  );
};

export default tableContainer;
