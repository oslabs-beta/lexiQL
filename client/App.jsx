import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import G6 from '@antv/g6';
// import Visualizer from './visualizer/Visualizer.jsx';
import NavBar from './components/navBar.jsx';
import HomePage from './pages/homePage.jsx';
import DataPage from './pages/dataPage.jsx';
import Table from './visualizer/Table.jsx';

const App = (props) => {
  return (
    <NavBar />
    // <div>
    //   <nav id="appHeader">
    //     <Link
    //       className="headerLinks"
    //       to="/"
    //     >
    //       <p>Home</p>
    //     </Link>

    //     <Link
    //       className="headerLinks"
    //       to='/data'
    //     >
    //       <p>Visualizer</p>
    //     </Link>
    //   </nav>

    //   <Switch>
    //     <Route path="/data">
    //       <DataPage />
    //     </Route>

    //     <Route exact path="/">
    //       <HomePage />
    //     </Route>

    //   </Switch>
    // </div>
  );
};

export default App;
