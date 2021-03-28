import React, { createContext, useContext, useState } from 'react';

export const DataContext = createContext();

const Provider = (props) => {
  // useState hook: arg 1 is the (current) state varible, arg 2 is a function we can use to update the value of the state variable
  const [ tables, setTables ] = useState([]);

  const storeTables = tables => {
    setTables(tables);
  }

  return (
    <DataContext.Provider value={{ tables, storeTables }} >
      {props.children}
    </DataContext.Provider>
  )
}

export default Provider;
