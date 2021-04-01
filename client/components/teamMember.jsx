import React from 'react';
// import githubIcon from '../assets/github-icon.jpeg';
// import linkedinIcon from '../assets/linkedin-icon.jpeg';
import LinkedinIcon from '../assets/linkedin-icon.png';
import GitHubIcon from '../assets/github-icon.png';

export default function teamMember({ name, headshot, github, linkedin }) {
  return (
    <div className="teamMember">
      <img className="headshot" src={headshot} alt="headshot" />
      <h1 className="name">{name}</h1>
      <div className="teamMemberLinks">
        {/* <a className="teamMemberLink" href={linkedin}>LinkedIn</a> */}
        {/* <a className="teamMemberLink" href={github}>GitHub</a> */}
        <img
          src={GitHubIcon}
          className="siteLogos"
          alt="logo"
          onClick={() => window.open(github)}
        />
        <img
          src={LinkedinIcon}
          className="siteLogos"
          alt="logo"
          onClick={() => window.open(linkedin)}
        />
      </div>
    </div>
  );
}
