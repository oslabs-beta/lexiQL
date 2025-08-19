import React from 'react';
import { Link } from 'react-router-dom';
import graphqlOutput from '../assets/GraphQL-output.png';
import databaseConnect from '../assets/database-connect.png';
import graphiql from '../assets/graphiql.png';
import schemaVisualization from '../assets/schema-visualization.png';

export default function DemoContainer() {
  const content = [
    [
      'Connect your PostgreSQL database',
      'Paste in a PostgreSQL connection string and Orbit generates a relational schema map of your tables and columns. No database? Launch the built-in sample to see Orbit in action.',
      databaseConnect,
    ],
    [
      'Explore your schema visually',
      'Orbit displays your schema as an interactive graph where you can clearly trace relationships, expand tables, and understand column structures at a glance.',
      schemaVisualization,
    ],
    [
      'Generate GraphQL boilerplate',
      'From your database structure, Orbit builds a complete GraphQL schema (types, resolvers, and connections) all ready to integrate directly into your API project.',
      graphqlOutput,
    ],
    [
      'Test instantly in GraphiQL',
      'Open an embedded GraphiQL playground to run queries and mutations against your live or sample database, validating schema output and testing connections right away.',
      graphiql,
    ],
  ];

  const introContent = [];
  for (let i = 0; i < content.length; i++) {
    const feature = content[i];
    introContent.push(
      <div key={i} className="feature-card">
        <div className="feature-step">{i + 1}</div>
        <h3 className="feature-title">{feature[0]}</h3>
        <p className="feature-description">{feature[1]}</p>
        <div className="feature-image">
          <img src={feature[2]} alt={feature[0]} />
        </div>
      </div>
    );
  }

  return (
    <div className="demoContainer">
      <div className="demoHeader">
        <h2 id="sectionHeader">What is Orbit?</h2>
        <p className="demo-lead">How Orbit works in 4 quick steps.</p>
      </div>
      <div className="feature-grid">{introContent}</div>
      <div className="demo-ctas">
        <Link to="/visualizer" className="cta-primary">
          Try Orbit now
        </Link>
        <a
          href="https://github.com/oslabs-beta/Orbit"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-secondary"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
