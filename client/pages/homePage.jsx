import React, { useEffect, useState } from 'react';
import AboutContainer from '../containers/aboutContainer.jsx';
import TeamContainer from '../containers/teamContainer.jsx';
import ContactContainer from '../containers/contactContainer.jsx';

export default function homePage() {
  return (
    <div>
      <AboutContainer />
      <div className="teamInfo">
        <TeamContainer />
      </div>
      <ContactContainer />
    </div>
  )
}