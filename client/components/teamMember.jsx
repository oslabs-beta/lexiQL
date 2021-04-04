import React from 'react';
import LinkedinIcon from '../assets/linkedin-icon.png';
import GitHubIcon from '../assets/github-icon.png';

export default function teamMember({ name, headshot, github, linkedin }) {
  return (
    <div className="teamMember">
      <img className="headshot" src={headshot} alt="headshot" />
      <h1 className="name">{name}</h1>
      <div className="teamMemberLinks">
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
