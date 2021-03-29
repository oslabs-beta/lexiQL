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

export default function dataPage() {
  // unclear if we should set the second argument in useReducer as an empty array or to an initial state or 'initialCodeState' as in reducers.js
  const [testCode, codeDispatch] = useReducer(codeReducer, initialCodeState);

  return (
    <div className="dataPage">
      {/* {arrComponents} */}

      <div className="graphicalContainer">
        {/* <VisualizerContext.Provider
        value={{
          visualizerState,
          visualizerDispatch
        }}> */}
        <VisualizerContainer />
        {/* </VisualizerContext.Provider> */}

        {/* <CodeContext.Provider
        value={{
          codeState,
          codeDispatch
        }}> */}
        <CodeContext.Provider value={{ testCode, codeDispatch }}>
          <PopupContainer />
          <CodeContainer />
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
