import React from 'react';
import Column from './Column.jsx';

const Table = (props) => {
  // console.log(props.tableName, ': ', props.tableContent[props.tableName]);
  console.log('props.tableName', props.tableName);
  console.log('props.tableContent', props.tableContent);
  // console.log('props.tableContent.length', Object.keys(props.tableContent.length))
  // console.log('length', Object.keys(props.tableContent).length)
  // console.log('column: ', props.tableContent.columns)

  const tableColumns = [];

  for (let i = 0; i < Object.keys(props.tableContent).length; i++) {
    // const key = Object.keys(props.tableContent)[i];
    // const value = props.tableContent[i];

    const key = Object.keys(props.tableContent[i])[0];
    // const value = Object.values(props.tableContent[i])[0];

    console.log('key: ', key)
    // console.log('value: ', value)

    tableColumns.push(
      <Column 
        key={`Column${i}`}
        columnName={key}
        // columnValue={value}
      />
    )
  }
  
  console.log('tableColumns: ', tableColumns);
  
  return (
    <div>
      <h5>
      {props.tableName}
      </h5>
      {/* {tableColumns} */}
    </div>
  )
}

export default Table;