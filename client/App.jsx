import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import G6 from '@antv/g6';
// import Visualizer from './visualizer/Visualizer.jsx';
import NavBar from './components/NavBar';
// import HomePage from './pages/homePage.jsx';
// import DataPage from './pages/dataPage.jsx';
// import Table from './visualizer/Table.jsx';

// import Provider from './context/state.js';

// const App = ({ Component, props }) => {
//   return (
//     <Provider>
//       <Component {...props} />
//     </Provider>);
// }

// export default App;

const App = (props) => {
  return <NavBar />;
};

export default App;
