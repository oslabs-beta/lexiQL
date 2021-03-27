import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import G6 from '@antv/g6';
// import Visualizer from './visualizer/Visualizer.jsx';
import HomePage from './pages/homePage.jsx';
import AppPage from './pages/appPage.jsx';
import Table from './visualizer/Table.jsx';

const App = (props) => {
  return (
    <div>
      <nav id="appHeader">
        <Link
          className="headerLinks"
          to="/"
        >
          <p>Home</p>
        </Link>

        <Link
          className="headerLinks"
          to='/app'
        >
          <p>Visualizer</p>
        </Link>
      </nav>

      <Switch>
        <Route path="/app">
          <AppPage />
        </Route>

        <Route exact path="/">
          <HomePage />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
