import React, { useEffect, useState } from 'react';
import IntroContainer from '../containers/introContainer.jsx';
import DemoContainer from '../containers/demoContainer.jsx';
import AboutUsContainer from '../containers/aboutUsContainer.jsx';
import FooterContainer from '../containers/footer.jsx';

export default function homePage() {
  //STATE MANAGEMENT

  return (
    <div>
      <IntroContainer />
      <DemoContainer />
      <div className="teamInfo">
        <AboutUsContainer />
      </div>
      <FooterContainer />
    </div>
  )
}
