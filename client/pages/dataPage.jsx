import React, { useReducer } from 'react';
import { DiagramContext, CodeContext } from '../state/contexts';
import {
  initialDiagramState,
  diagramReducer,
  initialCodeState,
  codeReducer,
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
      </div>
      <Footer />
    </div>
  );
}

// import React, { useReducer } from 'react';
// import { VisualizerContext, CodeContext } from '../state/contexts';
// import {
//   initialVisualizerState,
//   visualizerReducer,
//   initialCodeState,
//   codeReducer,
// } from '../state/reducers';

// import PopupContainer from '../containers/dbInputContainer';
// import VisualizerContainer from '../containers/diagramContainer';
// import CodeContainer from '../containers/codeContainer';
// import Footer from '../containers/footer.jsx';

// export default function dataPage() {
//   const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
//   const [visualizerState, visualizerDispatch] = useReducer(
//     visualizerReducer,
//     initialVisualizerState,
//   );

//   return (
//     <div className="dataPage">
//       <div className="graphicalContainer">
//         <CodeContext.Provider
//           value={{
//             codeState,
//             codeDispatch,
//           }}
//         >
//           <VisualizerContext.Provider
//             value={{
//               visualizerState,
//               visualizerDispatch,
//             }}
//           >
//             <PopupContainer />

//             <VisualizerContainer />
//             <CodeContainer />
//           </VisualizerContext.Provider>
//         </CodeContext.Provider>
//       </div>
//       <Footer />
//     </div>
//   );
// }
