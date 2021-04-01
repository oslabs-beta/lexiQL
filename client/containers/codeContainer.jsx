import React, { useContext } from 'react';
import { CodeContext } from '../state/contexts';
import CodeMirror from '../components/codeMirror';

export default function codeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);
  // console.log(testCode.test);

  const handleSchema = (e) => {
    e.preventDefault();
    console.log('TESTING SCHEMA HANDLER: ', codeState.schema);
    codeDispatch({
      type: 'SET_DISPLAY',
      payload: {
        displayCode: codeState.schema,
      },
    });
  };

  const handleResolver = (e) => {
    e.preventDefault();
    console.log('TESTING RESOLVER HANDLER: ', codeState.resolver);
    codeDispatch({
      type: 'SET_DISPLAY',
      payload: {
        displayCode: codeState.resolver,
      },
    });
  };

  return (
    <div className="codeContainer">
      {/* <div> */}
      <div className="codeButtons">
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
      </div>
      {/* <CodeMirror
        className="CodeMirror"
        value={codeState.displayCode}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
        }}
        // onChange={(editor, data, value) => {}}
      /> */}
      {/* <p>{codeState.resolver}</p> */}
      {/* <p>{codeState.schema}</p> */}
      {/* <p>{codeState.displayCode}</p> */}
      <br />
      <CodeMirror />
    </div>
  );
}
