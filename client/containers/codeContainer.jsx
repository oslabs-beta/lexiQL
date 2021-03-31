import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';

export default function codeContainer() {
  const { testCode } = useContext(CodeContext);
  // console.log(testCode.test);
  return (
    <div className="codeContainer">
      {/* <h1>Code will go here</h1> */}
      <p>{testCode.test}</p>
      <p>{testCode.schema}</p>
      <p>{testCode.resolver}</p>
      <br />

      <button
        type="button"
        className="codeContainerButton"
        id="schemaButton"
        // onClick={handleSampleData}
      >
        Schema
      </button>
      <br />
      <button
        type="button"
        className="codeContainerButton"
        id="resolverButton"
        // onClick={handleSampleData}
      >
        Resolver
      </button>
    </div>
  );
}
