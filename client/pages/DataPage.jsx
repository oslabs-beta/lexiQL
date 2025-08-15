import React, { useReducer } from 'react';
import { CodeContext, DiagramContext, FormContext } from '../state/contexts';
import {
  codeReducer,
  diagramReducer,
  formReducer,
  initialCodeState,
  initialDiagramState,
  initialFormState,
} from '../state/reducers';

import CodeContainer from '../containers/CodeContainer';
import DBInputContainer from '../containers/DBInputContainer';
import DiagramContainer from '../containers/DiagramContainer';

export default function DataPage() {
  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [diagramState, diagramDispatch] = useReducer(diagramReducer, initialDiagramState);
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
    </div>
  );
}
