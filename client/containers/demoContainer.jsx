import React from 'react';
import DemoItem from '../components/demoItem';
// IMPORT RELEVANT CONTEXT HERE


export default function DemoContainer() {
  // THIS IS ALL TEMPORARY CODE
  // STATE MANAGEMENT NEEDED!
  const demoItems = [];
  for (let i = 0; i < 3; i++) {
    demoItems.push(<DemoItem />);
  }

  return (
    <div className ='demoContainer'>
      <div className="demoHeader">
        <h3>DEMOS BELOW:</h3>
      </div>
      <div className="allDemos">
        {demoItems}
      </div>
    </div>
  );
}
