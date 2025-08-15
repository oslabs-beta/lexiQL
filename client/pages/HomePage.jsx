import React from 'react';

import IntroContainer from '../containers/IntroContainer.jsx';
import DemoContainer from '../containers/DemoContainer.jsx';
import AboutUsContainer from '../containers/AboutUsContainer.jsx';
import Footer from '../containers/Footer.jsx';

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="homePageContent">
        <IntroContainer />
        <DemoContainer />
        <AboutUsContainer />
      </div>
      <Footer />
    </div>
  );
}
