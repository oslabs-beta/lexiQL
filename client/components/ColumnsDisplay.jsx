import React from 'react';

export default function ColumnsDisplay (props) {
  
  return (
    <div>
      <p>
        {props.propertyKey}
        <br></br>
        {props.propertyValue}
      </p>
    </div>
  )
}
