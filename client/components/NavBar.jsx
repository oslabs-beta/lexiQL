import React from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import HomePage from '../pages/homePage.jsx';
import DataPage from '../pages/dataPage.jsx';
import Logo from '../assets/new-logo.png';

export default function navBar() {
  const location = useLocation();
<<<<<<< HEAD
  //
  if (location.pathname === "/") {
=======

  if (location.pathname === '/') {
>>>>>>> 394c0114bed5a62b07e0e5b5b72069c6373a27be
    return (
      <body id="homeBody">
        <nav id="homeHeader">
          <a
            href="https://graphql.org/learn/"
            target="_blank"
            className="headerLinks"
            rel="noreferrer"
          >
            <p>Docs</p>
          </a>

          <a
            href="https://github.com/oslabs-beta/lexiQL"
            target="_blank"
            className="headerLinks"
            rel="noreferrer"
          >
            <p>GitHub</p>
          </a>

          <Link className="headerLinks" to="/data">
            <p>Visualize</p>
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
    );
  }

  if (location.pathname === '/data') {
    return (
      <body id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img className="homeLogo" id="homeLogo" src={Logo} alt="logo" />
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
    );
  }
}
