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
import Footer from '../containers/footer.jsx';

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
        <CodeContext.Provider
          value={{
            codeState,
            codeDispatch,
          }}
        >
          <DiagramContext.Provider
            value={{
              diagramState,
              diagramDispatch,
            }}
          >
            <DBInputContainer />
            <DiagramContainer />
            <CodeContainer />
          </DiagramContext.Provider>
        </CodeContext.Provider>

        {/* <FormContext.Provider
          value={{
            formState,
            formDispatch,
          }}
        >
          <DBInputContainer />
        </FormContext.Provider> */}
      </div>
      <Footer />
    </div>
  );
}

// import React, { useReducer } from 'react';
// import { DiagramContext, CodeContext, FormContext } from '../state/contexts';
// import {
//   initialDiagramState,
//   diagramReducer,
//   initialCodeState,
//   codeReducer,
//   initialFormState,
//   formReducer,
// } from '../state/reducers';

// import DBInputContainer from '../containers/dbInputContainer';
// import DiagramContainer from '../containers/diagramContainer';
// import CodeContainer from '../containers/codeContainer';
// import Footer from '../containers/footer.jsx';

// export default function dataPage() {
//   const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
//   const [diagramState, diagramDispatch] = useReducer(
//     diagramReducer,
//     initialDiagramState,
//   );
//   const [formState, formDispatch] = useReducer(formReducer, initialFormState);

//   return (
//     <div className="dataPage">
//       <div className="graphicalContainer">
//         <CodeContext.Provider
//           value={{
//             codeState,
//             codeDispatch,
//           }}
//         >
//           <DiagramContext.Provider
//             value={{
//               diagramState,
//               diagramDispatch,
//             }}
//           >
//             <DBInputContainer />
//             <DiagramContainer />
//             <CodeContainer />
//           </DiagramContext.Provider>
//         </CodeContext.Provider>

//         {/* <FormContext.Provider
//           value={{
//             formState,
//             formDispatch,
//           }}
//         >
//           <DBInputContainer />
//         </FormContext.Provider> */}
//       </div>
//       <Footer />
//     </div>
//   );
// }
