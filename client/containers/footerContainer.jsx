import React from 'react';

export default function footerContainer() {
  const linkedin = 'https://www.linkedin.com/company/draqlabs';
  const twitter = 'https://twitter.com/draQLabs';
  const github = 'https://github.com/oslabs-beta/DraQLa/';

  return (
    <div className='footerContainer'>
      <hr/>
      <div className='footerIconContainer'>
        <a href={linkedin} target='_'>
          <img className='footerIcon' src='../assets/linkedin.png'></img>
        </a>
        <a href={twitter} target='_'>
          <img className='footerIcon' src='../assets/twitter.png'></img>
        </a>
        <a href={github} target='_'>
          <img className='footerIcon' src='../assets/github.png'></img>
        </a>
      </div>
    </div>
  );
}
