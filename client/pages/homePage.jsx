import React, { useContext, useReducer, useEffect, useState } from 'react';
import { HomePageContext } from '../state/contexts';
import { initialHomePageState, homePageReducer } from '../state/reducers';

import IntroContainer from '../containers/introContainer.jsx';
import DemoContainer from '../containers/demoContainer.jsx';
import AboutUsContainer from '../containers/aboutUsContainer.jsx';
import Footer from '../containers/footer.jsx';

export default function homePage() {
  const [homePageState, homePageDispatch] = useReducer(homePageReducer, initialHomePageState);

  return (
    <div className='homePage'>
      <HomePageContext.Provider value ={{
        homePageState,
        homePageDispatch
      }}>
        <div className='homePageContent'>
          <IntroContainer />
          <DemoContainer />
          <div className="teamInfo">
            <AboutUsContainer />
          </div>
        </div>
      </HomePageContext.Provider>
      <Footer />
    </div>
  )
}
