import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';

export default function codeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);
  // console.log(testCode.test);

  const handleSchema = (e) => {
    e.preventDefault();
    console.log('TESTING SCHEMA HANDLER: ', codeState.schema);
    codeDispatch({
      type: 'SET_CODE',
      payload: {
        displayCode: codeState.schema,
      },
    });
  };

  const handleResolver = (e) => {
    e.preventDefault();
    console.log('TESTING RESOLVER HANDLER: ', codeState.resolver);
    codeDispatch({
      type: 'SET_CODE',
      payload: {
        displayCode: codeState.resolver,
      },
    });
  };

  return (
    <div className="codeContainer">
      <button
        type="button"
        className="codeContainerButton"
        id="schemaButton"
        onClick={handleSchema}
      >
        Schema
      </button>
      <br />
      <button
        type="button"
        className="codeContainerButton"
        id="resolverButton"
        onClick={handleResolver}
      >
        Resolver
      </button>

      {/* <p>{codeState.resolver}</p> */}
      {/* <p>{codeState.schema}</p> */}
      <p>{codeState.displayCode}</p>
      <br />
    </div>
  );
}
