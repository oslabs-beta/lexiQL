import React from 'react';

import DemoContainer from '../containers/DemoContainer.jsx';
import FAQ from '../containers/FAQ.jsx';
import Footer from '../containers/Footer.jsx';
import IntroContainer from '../containers/IntroContainer.jsx';

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="homePageContent">
        <IntroContainer />
        <DemoContainer />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}
