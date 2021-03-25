import React, { useEffect, useState } from 'react';
// import G6 from '@antv/g6';
// import Visualizer from './components/Visualizer.jsx';
import Table from './components/Table.jsx';

const App = (props) => {

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
        console.log('state', state);
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

  return (
    // <Visualizer />
    <div>
      {/* <h1>Hi</h1> */}
      {arrComponents}
    </div>
  );
};

export default App;
