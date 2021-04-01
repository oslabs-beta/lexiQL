import React from "react";
import example from "../assets/visualizer-sample.png";
import input from "../assets/db-input.png";
import visual from "../assets/db-visualizer.png";
import schemas from "../assets/schemas-result.png";
import resolvers from "../assets/resolvers-result.png";

export default function demoItem({ index, title, description, gif }) {
  // console.log("gif path: ", gif);
  // console.log("description: ", description);
  // console.log("example: ", example);

  if (index === 0) {
    return (
      <div className="demoItem">
        <img className="demoGif" id="input" src={input} alt="demo-gif" />
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="demoItem">
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
        <img className="demoGif" id="visual" src={visual} alt="demo-gif" />
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="demoItem">
        <div className="schemaResolver">
          <img className="demoGif" id="schema" src={schemas} alt="demo-gif" />
          <img
            className="demoGif"
            id="resolver"
            src={resolvers}
            alt="demo-gif"
          />
        </div>
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
      </div>
    );
  }

  /*--------ORIGINAL CONDITIONAL LOGIC (before temporary hard coding above):
  if (index % 2) {
    return (
      <div className="demoItem">
        <img
          id="demoGif"
          src="/client/assets/visualizer-sample.png"
          alt="demo-gif"
        />
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="demoItem">
        <div className="featureWords">
          <h1 className="featureName">{title}</h1>
          <p className="featureDescription">{description}</p>
        </div>
        <img id="demoGif" src={example} alt="demo-gif" />
      </div>
    );
  }
  */
}
