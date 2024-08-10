import React from 'react';
import Logo from '../assets/new-logo.png';

export default function introContainer() {
  return (
    <div id='about'>
      <img id='logo' src={Logo} alt='logo' />
    </div>
  );
}
