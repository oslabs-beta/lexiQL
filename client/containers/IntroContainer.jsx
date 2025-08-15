import React from 'react';
import Logo from '../assets/new-logo.png';

export default function IntroContainer() {
  return (
    <div id="about">
      <img
        id="logo"
        src={Logo}
        alt="lexiQL Logo - GraphQL API Generation Tool"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
    </div>
  );
}
