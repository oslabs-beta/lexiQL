import React from 'react';
import ColumnsDisplay from './ColumnsDisplay';

export default function Column (props) {
  console.log('props.columnName', props.columnName);
  console.log('props.columnValue', props.columnValue);

  const currentSchema = [];

  for (let i = 0; i < Object.keys(props.columnValue).length; i++) {
    // const key = Object.keys(props.tableContent)[i];
    // const value = props.tableContent[i];

    // const key = Object.keys(props.currentSchema)[i];

    const key = Object.keys(props.columnValue)[i];
    const value = Object.values(props.columnValue)[i];
    
    console.log('KEY: ', key);
    console.log('VALUE: ', value);

    currentSchema.push(
      <ColumnsDisplay 
        key={`ColumnsDisplay${i}`}
        columnName={props.columnName}
        propertyKey={key}
        propertyValue={value}
      />
    )
  }

    console.log('currentSchema: ', currentSchema);

  return (
    <div>
      <h6 style={{color:'red'}}>
        {props.columnName}
      </h6>
      {currentSchema}
    </div>
  )
}