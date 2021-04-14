import React from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import HomePage from '../pages/homePage.jsx';
import DataPage from '../pages/dataPage.jsx';
import Logo from '../assets/new-logo.png';
import TwitterLogo from '../assets/navy-twitter.png';
import LinkedinLogo from '../assets/navy-linkedin.png';
import GithubLogo from '../assets/navy-github.png';

export default function navBar() {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <body id="homeBody">
        <nav id="homeHeader">
          <div className="socialLogos">
            <a
              href="https://twitter.com/lexiql"
              target="_blank"
              className="headerLinks"
              rel="noreferrer"
            >
              <img
                className="homeLogo"
                id="homeLogo"
                src={TwitterLogo}
                alt="logo"
              />
            </a>

            <a
              href="https://www.linkedin.com/company/lexiql"
              target="_blank"
              className="headerLinks"
              rel="noreferrer"
            >
              <img
                className="homeLogo"
                id="homeLogo"
                src={LinkedinLogo}
                alt="logo"
              />
            </a>

            <a
              href="https://github.com/oslabs-beta/lexiQL"
              target="_blank"
              className="headerLinks"
              rel="noreferrer"
            >
              <img
                className="homeLogo"
                id="homeLogo"
                src={GithubLogo}
                alt="logo"
              />
            </a>
          </div>

          <div className="rightLinks">
            <a
              href="https://graphql.org/learn/"
              target="_blank"
              className="headerLinks"
              rel="noreferrer"
            >
              <p>Docs</p>
            </a>

            <Link className="headerLinks" to="/data">
              <p>Visualize</p>
            </Link>
          </div>
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

          <Link
            className="headerLinks"
            to="/playground"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            <p>Playground</p>
          </Link>
        </nav>

        <Switch>
          <Route path="/playground">
            <h1>insert Graphiql playground here</h1>
          </Route>

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

  if (location.pathname === '/playground') {
    return (
      <body id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img className="homeLogo" id="homeLogo" src={Logo} alt="logo" />
          </Link>
          <Link className="headerLinks" to="/data">
            <p>Visualize</p>
          </Link>
        </nav>

        <Switch>
          <Route path="/playground">
            <h1>insert Graphiql playground here, Travis</h1>
          </Route>

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
