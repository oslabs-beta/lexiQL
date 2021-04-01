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
<<<<<<< HEAD
      <p className="displayCode" id="displayCode">{codeState.displayCode}</p>
=======
      {/* <p>{codeState.displayCode}</p> */}
>>>>>>> 24cf1a375ca382d4b2f2031ee70b18ead72dd922
      <br />
      <CodeMirror />
    </div>
  );
}
