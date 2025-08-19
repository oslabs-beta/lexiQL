import React from 'react';
import CodeMirror from '../assets/GraphQL-output.png';
import UserInput from '../assets/database-connect.png';
import graphiql from '../assets/graphiql.png';
import MovingTables from '../assets/schema-visualization.png';

export default function DemoItem({ index, title, description, _gif }) {
  if (index === 0) {
    return (
      <div className="demo-card">
        <div className="demo-card__content">
          <h2 className="featureName">{title}</h2>
          <p className="featureDescription">{description}</p>
        </div>
        <div className="demo-card__media">
          <img className="demoGif" id="input" src={UserInput} alt="demo-gif" decoding="async" />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="demo-card">
        <div className="demo-card__content">
          <h2 className="featureName">{title}</h2>
          <p className="featureDescription">{description}</p>
        </div>
        <div className="demo-card__media">
          <img className="demoGif" id="visual" src={MovingTables} alt="demo-gif" decoding="async" />
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="demo-card">
        <div className="demo-card__content">
          <h2 className="featureName">{title}</h2>
          <p className="featureDescription">{description}</p>
        </div>
        <div className="demo-card__media">
          <img className="demoGif" id="schemas" src={CodeMirror} alt="demo-gif" decoding="async" />
        </div>
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="demo-card">
        <div className="demo-card__content">
          <h2 className="featureName">{title}</h2>
          <p className="featureDescription">{description}</p>
        </div>
        <div className="demo-card__media">
          <img className="demoGif" id="playground" src={graphiql} alt="demo-gif" decoding="async" />
        </div>
      </div>
    );
  }
}
