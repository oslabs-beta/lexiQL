import React from 'react';

export default function ColumnsDisplay (props) {

  const tableColumns = [];

  for (let i = 0; i < Object.keys(props.tableContent.columns).length; i++) {
    const key = Object.keys(props.tableContent.columns)[i];
    // const value = Object.values(props.tableContent.columns)[i];

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
      <h1>
      {tableColumns}
      {/* {props.tableContent} */}
      </h1>
    </div>
  )
}
