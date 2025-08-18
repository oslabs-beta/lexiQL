import React from 'react';
import Logo from '../assets/orbit-logo-black.png';

export default function IntroContainer() {
  return (
    <div id="about">
      <img
        id="logo"
        src={Logo}
        alt="lexiQL Logo - GraphQL API Generation Tool"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
