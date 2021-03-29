import React from 'react';
import DemoItem from '../components/demoItem';

export default function DemoContainer() {
  const content = [
    [
      'Title for #1',
      'This is a description of our first lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png',
    ],
    [
      'Title for #2',
      'This is a description of our second lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png'
    ],
    [
      'Title for #3',
      'This is a description of our third lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png'
    ]
  ];

  const introContent = content.map((feature, index) => {
    return <DemoItem key={index} title={feature[0]} description={feature[1]} gif={feature[2]} />
  });

  return (
    <div className ='demoContainer'>
      <div className="demoHeader">
        <h3>DEMOS BELOW:</h3>
      </div>
      <div className="allDemos">
        {introContent}
      </div>
    </div>
  );
}
