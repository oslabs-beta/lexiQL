import React from 'react';

export default function Column (props) {
  console.log('props.columnName', props.columnName);
  console.log('props.columnValue', props.columnValue);

  // const currSchema = [];

  // for (let i = 0; i < Object.keys(props.tableContent.columns).length; i++) {
  //   // const key = Object.keys(props.tableContent)[i];
  //   // const value = props.tableContent[i];

  //   const key = Object.keys(props.tableContent.columns)[i];
  //   const value = Object.values(props.tableContent.columns)[i];

  //   // console.log('key: ', key)
  //   // console.log('value: ', value)

  //   tableColumns.push(
  //     <Column 
  //       key={`Column${i}`}
  //       columnName={key}
  //       columnValue={value}
  //     />
  //   )
  // }

  return (
    <div>
      <h6>
        {props.columnName}
      </h6>
      {/* {tableColumns} */}
    </div>
  )
}