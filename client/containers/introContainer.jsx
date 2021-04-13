import React from "react";
// import Logo from '../assets/lexiql-logo.png';
import Logo from "../assets/new-logo.png";

export default function introContainer() {
  return (
    <div id="about">
      <img id="logo" src={Logo} alt="logo" />
      {/* <div className="aboutProject"> 
        <h3>What do we do?</h3>
        <p>
          Provide you with a <i>lexical</i> framework for your GraphQL schemas and resolvers.
        </p>
      </div> */}
      {/* <div className="aboutProject">
        <h3>Header #2</h3>
        <p>
          This writing is about our second awesome header and all the reasons
          you should use our tool!
        </p>
      </div> */}
      {/* <div className="aboutProject">
        <h3>Featured on Medium</h3>
        <p>
          Here's a third absolutely killer reason you should use this kickin'
          tool. Seriously, just use it. 
        </p>
      </div> */}
    </div>
  );
}
