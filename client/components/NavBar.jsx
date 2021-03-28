import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from '../pages/homePage.jsx';
import DataPage from '../pages/dataPage.jsx';
// import Table from './visualizer/Table.jsx';

export default function navBar() {
  return(
  // <div id="navBar">
  <body>
    <nav id="appHeader">
      <Link
        className="headerLinks"
        to="/"
      >
        <p>Home</p>
      </Link>

      <Link
        className="headerLinks"
        to='/data'
      >
        <p>Visualizer</p>
      </Link>
    </nav>

    <Switch>
      <Route path="/data">
        <DataPage />
      </Route>

      <Route exact path="/">
        <HomePage />
      </Route>

    </Switch>
  </body>
  )
}