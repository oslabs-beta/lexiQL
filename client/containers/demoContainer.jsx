import React from 'react';
import DemoItem from '../components/demoItem';

export default function DemoContainer() {
  const content = [
    [
      'Import your PostgreSQL database',
      'Simply input a PostgreSQL database URI, and lexiQL will auto-generate your relational database schema. (Don’t have a database to input right now but still want to test our tool? Use our sample database to explore what lexiQL can do for you.)',
      '../assets/db-input.png',
    ],
    [
      'Visualize your relational database',
      'Dynamically interact with your relational database and view complex relationships between your tables.',
      '../assets/visualizer-sample.png',
    ],
    [
      'Generate GraphQL boilerplate',
      'View your new GraphQL schema, including types and resolvers. The result is ready for GraphQL API implementation and can be easily copied for injection into your code.',
      '../assets/visualizer-sample.png',
    ],
    [
      'Test GraphQL schemas on a playground',
      'Test GraphQL functionality schemas on an integrated GraphiQL interface, exploring queries and mutations on the provided database.',
      '../assets/visualizer-sample.png',
    ],
  ];

  const introContent = [];
  for (let i = 0; i < content.length; i++) {
    const feature = content[i];
    introContent.push(
      <DemoItem key={i} index={i} title={feature[0]} description={feature[1]} gif={feature[2]} />
    );
  }

  return (
    <div className="demoContainer">
      <div className="demoHeader">
        <h3 id="sectionHeader">What is lexiQL?</h3>
      </div>
      <div className="allDemos">{introContent}</div>
    </div>
  );
}
