import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import HomePage from "../pages/homePage.jsx";
import DataPage from "../pages/dataPage.jsx";
// import Table from './visualizer/Table.jsx';

export default function navBar() {
  const location = useLocation();
  // console.log("LOCATION:", location);

  // if (location.pathname === "/") console.log("HOMEPAGE");
  // if (location.pathname === "/data") console.log("APP PAGE");

  if (location.pathname === "/") {
    return (
      <body>
        <nav id="appHeader">
          {/* <Link className="headerLinks" to="/">
            <p>Home</p>
          </Link> */}

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

  if (location.pathname === "/data") {
    return (
      <body>
        <nav id="appHeader">
          <Link className="headerLinks" to="/">
            <p>Home</p>
          </Link>

          {/* <Link className="headerLinks" to="/data">
            <p>Visualizer</p>
          </Link> */}
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
