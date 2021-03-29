import React from 'react';
import DemoItem from '../components/demoItem';

export default function DemoContainer() {
  const content = [
    [
      'Visualize your database',
      'This is a description of our first lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png',
    ],
    [
      'Create prototypes',
      'This is a description of our second lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png'
    ],
    [
      'Interact with your data',
      'This is a description of our third lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png'
    ]
  ];

  const introContent = [];
  for (let i = 0; i < content.length; i++) {
    const feature = content[i];
    introContent.push(
    <DemoItem 
      key={i} 
      index={i} 
      title={feature[0]} 
      description={feature[1]} 
      gif={feature[2]} 
    />)
  }

  return (
    <div className ='demoContainer'>
      <div className="demoHeader">
        <h3>lexiQL Overview</h3>
      </div>
      <div className="allDemos">
        {introContent}
      </div>
    </div>
  );
}
