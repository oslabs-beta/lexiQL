import React, { Suspense } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import GithubLogo from '../assets/navy-github.png';
import LinkedinLogo from '../assets/navy-linkedin.png';
import TwitterLogo from '../assets/navy-twitter.png';
import WhiteLogo from '../assets/orbit-logo-white.png';

// Lazy load pages for better performance
const DataPage = React.lazy(() => import('../pages/DataPage.jsx'));
const HomePage = React.lazy(() => import('../pages/HomePage.jsx'));

export default function NavBar() {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <div id="homeBody">
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
                alt="Twitter Profile Link"
                decoding="async"
                loading="lazy"
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
                alt="LinkedIn Profile Link"
                decoding="async"
                loading="lazy"
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
                alt="GitHub Repository Link"
                decoding="async"
                loading="lazy"
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

        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Switch>
            <Route path="/data">
              <DataPage />
            </Route>

            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </div>
    );
  }

  if (location.pathname === '/data') {
    return (
      <div id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img
              className="homeLogo"
              id="homeLogo"
              src={WhiteLogo}
              alt="lexiQL Logo"
              decoding="async"
              fetchPriority="high"
              loading="eager"
            />
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

        <Suspense fallback={<div className="loading">Loading...</div>}>
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
        </Suspense>
      </div>
    );
  }

  if (location.pathname === '/playground') {
    return (
      <div id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img
              className="homeLogo"
              id="homeLogo"
              src={WhiteLogo}
              alt="lexiQL Logo"
              decoding="async"
              loading="eager"
            />
          </Link>
          <Link className="headerLinks" to="/data">
            <p>Visualize</p>
          </Link>
        </nav>

        <Suspense fallback={<div className="loading">Loading...</div>}>
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
        </Suspense>
      </div>
    );
  }
}
