import React from 'react';
import example from '../assets/visualizer-sample.png';

export default function demoItem(props) {
  // will be receiving team member info in props
  
  return (
    <div className ='demoItem'>
      {/* <img id='demoGif' src='../assets/knees.png'></img> */}
      <img id='demoGif' src={example} alt="Example visualizer"></img>

      <div className="featureWords">
      <h1 className="featureName">EXAMPLE FEATURE</h1>
        <p className="featureDescription">Description line #1 Description line #1 Description line #1 Description line #1 Description line #1</p>
      </div>

    </div>
  )
}
