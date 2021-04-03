import React, { useEffect, useState, useReducer } from "react";
import { VisualizerContext, CodeContext } from "../state/contexts";
import {
  initialVisualizerState,
  visualizerReducer,
  initialCodeState,
  codeReducer,
} from "../state/reducers";

import PopupContainer from "../containers/popupContainer";
import VisualizerContainer from "../containers/visualizerContainer";
import CodeContainer from "../containers/codeContainer";
import Footer from "../containers/footer.jsx";
import TableNode from "../components/tableNode";
import URIForm from "../components/URIForm";
import Canvas from "../components/canvas";

export default function dataPage() {
  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [visualizerState, visualizerDispatch] = useReducer(
    visualizerReducer,
    initialVisualizerState
  );

  return (
    <div className="dataPage">
      {/* {arrComponents} */}

      <div className="graphicalContainer">
        {/* <VisualizerContext.Provider
          value={{
            visualizerState,
            visualizerDispatch,
          }}
        >
          <VisualizerContainer />
          <TableNode />
        </VisualizerContext.Provider> */}

        {/* <CodeContext.Provider
        value={{
          codeState,
          codeDispatch
        }}> */}
        <CodeContext.Provider
          value={{
            codeState,
            codeDispatch,
          }}
        >
          <VisualizerContext.Provider
            value={{
              visualizerState,
              visualizerDispatch,
            }}
          >
            <PopupContainer />
            {/* <Canvas /> */}
            <VisualizerContainer />
            <CodeContainer />
          </VisualizerContext.Provider>
        </CodeContext.Provider>
        {/* </CodeContext.Provider> */}
      </div>
      <Footer />
    </div>
  );
}
