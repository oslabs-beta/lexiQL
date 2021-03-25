import React from 'react';

export default function Column (props) {

  return (
    <div>
      <h1>
      {/* {tableColumns} */}
      {props.columnName}
      </h1>
    </div>
  )
}