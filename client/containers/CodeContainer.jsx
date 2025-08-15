import React, { Suspense, useContext } from 'react';
import { CodeContext } from '../state/contexts';
let CodeMirror;
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  CodeMirror = require('../components/CodeMirror').default;
} else {
  CodeMirror = React.lazy(() => import('../components/CodeMirror'));
}

export default function CodeContainer() {
  const { codeState, codeDispatch } = useContext(CodeContext);

  const handleSchema = (e) => {
    e.preventDefault();
    codeDispatch({
      type: 'SET_DISPLAY',
      payload: {
        displayCode: codeState.schema,
      },
    });
  };

  const handleResolver = (e) => {
    e.preventDefault();
    codeDispatch({
      type: 'SET_DISPLAY',
      payload: {
        displayCode: codeState.resolver,
      },
    });
  };

  const toggle = () => {
    codeDispatch({
      type: 'TOGGLE_CODE',
      payload: {
        codeIsOpen: !codeState.codeIsOpen,
      },
    });
  };

  return (
    <div className="codeContainer" id="codeContainer">
      <button
        type="button"
        className={codeState.codeIsOpen ? 'codeToggleBtn open' : 'codeToggleBtn'}
        onClick={toggle}
      >
        {codeState.codeIsOpen ? '-' : '+'}
      </button>

      <div className={codeState.codeIsOpen ? 'sidebar open' : 'sidebar'}>
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
          <br />
          <button
            id="copyButton"
            className="codeContainerButton"
            onClick={() => {
              navigator.clipboard.writeText(codeState.displayCode);
            }}
          >
            Copy
          </button>
        </div>
        <br />
        <Suspense fallback={<div style={{ padding: '1rem' }}>Loading editor…</div>}>
          <CodeMirror />
        </Suspense>
      </div>
    </div>
  );
}
