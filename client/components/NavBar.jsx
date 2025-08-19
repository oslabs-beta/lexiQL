import React, { Suspense } from 'react';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import GithubLogo from '../assets/navy-github.png';
import LinkedinLogo from '../assets/navy-linkedin.png';
import TwitterLogo from '../assets/navy-twitter.png';
import WhiteLogo from '../assets/orbit-logo-white.png';

// Lazy load pages for better performance
const DataPage = React.lazy(() => import('../pages/DataPage.jsx'));
const HomePage = React.lazy(() => import('../pages/HomePage.jsx'));

export default function NavBar() {
  const location = useLocation();
  const history = useHistory();
  const isHomePage = location.pathname === '/';

  const handleFAQClick = () => {
    if (location.pathname !== '/') {
      history.push('/');
      // Wait for navigation to complete, then scroll to FAQ
      setTimeout(() => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on homepage, just scroll to FAQ
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id={isHomePage ? 'homeBody' : 'appBody'}>
      <nav id={isHomePage ? 'homeHeader' : 'appHeader'}>
        {isHomePage ? (
          // Home page navigation
          <>
            <div className="socialLogos">
              <a
                href="https://twitter.com/orbit"
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
                href="http://linkedin.com/company/orbit-dev"
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
                href="https://github.com/oslabs-beta/Orbit"
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
              <Link className="headerLinks" to="/visualizer">
                <p>Playground</p>
              </Link>

              <a href="#faq" className="headerLinks">
                <p>FAQ</p>
              </a>
            </div>
          </>
        ) : (
          // App page navigation
          <>
            <Link className="headerLogo" to="/">
              <img
                className="homeLogo"
                id="homeLogo"
                src={WhiteLogo}
                alt="Orbit Logo"
                decoding="async"
                fetchPriority="high"
                loading="eager"
              />
            </Link>

            {location.pathname === '/visualizer' && (
              <div className="rightLinks">
                <button
                  onClick={() => window.open('/playground', '_blank')}
                  className="headerLinks"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <p>Sandbox</p>
                </button>

                <button
                  onClick={handleFAQClick}
                  className="headerLinks"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <p>FAQ</p>
                </button>
              </div>
            )}

            {location.pathname === '/playground' && (
              <Link className="headerLinks" to="/visualizer">
                <p>Visualize</p>
              </Link>
            )}
          </>
        )}
      </nav>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Switch>
          <Route path="/visualizer">
            <DataPage />
          </Route>

          <Route path="/playground">
            <h1>insert Graphiql playground here</h1>
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
