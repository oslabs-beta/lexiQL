import React from 'react';
import example from '../assets/visualizer-sample.png';

export default function demoItem({ title, description, gif }) {
  // will be receiving team member info in props
  
  return (
    <div className ='demoItem'>
      <img id='demoGif' src={example} alt='demo-gif' />
      <div className="featureWords">
        <h1 className="featureName">{title}</h1>
        <p className="featureDescription">{description}</p>
      </div>
    </div>
  )
}
