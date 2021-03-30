import React from 'react';
import example from '../assets/visualizer-sample.png';

export default function demoItem({ index, title, description, gif }) {
  if ((index % 2)) {
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
  else {
    return (
      <div className ='demoItem'>
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
        <img id='demoGif' src={example} alt='demo-gif' /> 
      </div>
    )
  }
}
