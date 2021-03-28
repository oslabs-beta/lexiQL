import React from 'react';

export default function demoItem(props) {
  // will be receiving team member info in props
  
  return (
    <div className ='demoItem'>
      <h1 className="featureName">EXAMPLE FEATURE</h1>
      <div className="featureDescription">
        <p>Description line #1 Description line #1 Description line #1 Description line #1 Description line #1</p>
      </div>
    </div>
  )
}
