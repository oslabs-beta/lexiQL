import React from 'react';
import DemoItem from '../components/demoItem';

export default function DemoContainer() {
  const content = [
    [
      'Imports your PostgresQL database',
      'Simply paste in your PostgresQL link and lexiQL will auto-generate your relational database schema. Or, select a sample database to try out our tool.',
      '../assets/db-input.png',
    ],
    [
      'Visualizes your database schema',
      'Interact with your database schema and view relationships between your tables.',
      '../assets/visualizer-sample.png',
    ],
    [
      'Generates a GraphQL schema',
      'View the GraphQL schema generated for the provided database, including the types and associated resolvers. The result is ready for GraphQL API implementation.',
      '../assets/visualizer-sample.png',
    ],
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
      />,
    );
  }

  return (
    <div className="demoContainer">
      <div className="demoHeader">
        <h3>What does lexiQL do?</h3>
      </div>
      <div className="allDemos">{introContent}</div>
    </div>
  );
}
