import React, { useReducer } from 'react';
import { DiagramContext, CodeContext, FormContext } from '../state/contexts';
import {
  initialDiagramState,
  diagramReducer,
  initialCodeState,
  codeReducer,
  initialFormState,
  formReducer,
} from '../state/reducers';

import DBInputContainer from '../containers/dbInputContainer';
import DiagramContainer from '../containers/diagramContainer';
import CodeContainer from '../containers/codeContainer';
import Footer from '../containers/footer';

export default function dataPage() {
  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [diagramState, diagramDispatch] = useReducer(
    diagramReducer,
    initialDiagramState,
  );
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  return (
    <div className="dataPage">
      <div className="graphicalContainer">
        <DiagramContext.Provider
          value={{
            diagramState,
            diagramDispatch,
          }}
        >
          <DiagramContainer />
        </DiagramContext.Provider>

        <CodeContext.Provider
          value={{
            codeState,
            codeDispatch,
          }}
        >
          <CodeContainer />
        </CodeContext.Provider>

        <FormContext.Provider
          value={{
            formState,
            formDispatch,
            diagramState,
            diagramDispatch,
            codeState,
            codeDispatch,
          }}
        >
          <DBInputContainer />
        </FormContext.Provider>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
