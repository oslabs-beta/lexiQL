import React from 'react';

export default function ColumnsDisplay (props) {
  
  return (
    <div>
      <h6>
        {props.propertyKey}
        <br></br>
        {props.propertyValue}
      </h6>
    </div>
  )
}
