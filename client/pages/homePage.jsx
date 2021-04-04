import React from 'react';

import IntroContainer from '../containers/introContainer.jsx';
import DemoContainer from '../containers/demoContainer.jsx';
import AboutUsContainer from '../containers/aboutUsContainer.jsx';
import Footer from '../containers/footer.jsx';

export default function homePage() {
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
