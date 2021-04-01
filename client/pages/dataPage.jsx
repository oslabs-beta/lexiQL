import React, { useEffect, useState, useReducer } from 'react';
import { VisualizerContext, CodeContext } from '../state/contexts';
import {
  initialVisualizerState,
  visualizerReducer,
  initialCodeState,
  codeReducer,
} from '../state/reducers';

import PopupContainer from '../containers/popupContainer';
import Table from '../visualizer/Table.jsx';
import VisualizerContainer from '../containers/visualizerContainer';
import CodeContainer from '../containers/codeContainer';
import Footer from '../containers/footer.jsx';
import TableNode from '../components/tableNode';
import URIForm from '../components/URIForm';
import Canvas from '../components/canvas';

export default function dataPage() {
  const [codeState, codeDispatch] = useReducer(codeReducer, initialCodeState);
  const [visualizerState, visualizerDispatch] = useReducer(
    visualizerReducer,
    initialVisualizerState,
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
            <Canvas />
            {/* <VisualizerContainer /> */}
            <CodeContainer />
          </VisualizerContext.Provider>
        </CodeContext.Provider>
        {/* </CodeContext.Provider> */}
      </div>
      <Footer />
    </div>
  );
}

/*
  const [ state, setState ] = useState([]);
  const [ tables, setTables ] = useState([]);

  useEffect(() => {
    fetch('/example-schema')
      .then((res) => res.json())
      .then((data) => {
        const tableNames = Object.keys(data);
        setTables(tableNames)
        // console.log('table names: ', tables);
        
        const stateArr = [];
        for (let i = 0; i < tableNames.length; i++) {
          let nestedObj = {};
          nestedObj[tableNames[i]] = data[tableNames[i]];
          // console.log('nestedObj', nestedObj);
          stateArr.push(nestedObj);
        }
        // console.log('stateArr ', stateArr);
        // console.log(stateArr[0]);
        
        setState(stateArr);
        // console.log('state', state);
      });
  });

  const arrComponents = [];
  for (let i = 0; i < state.length; i++) {
    const key = Object.keys(state[i])[0];
    const value = Object.values(state[i])[0];
    arrComponents.push(
      <Table 
        key={`Table${i}`}
        // table={tables[i]}
        tableName={key}
        tableContent={value}
      />
    )
  }
  */
