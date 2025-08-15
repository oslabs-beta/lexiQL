import React from 'react';
import GitHubIcon from '../assets/white-github.png';
import LinkedinIcon from '../assets/white-linkedin.png';

export default function TeamMember({ name, headshot, github, linkedin }) {
  return (
    <div className="teamMember">
      <img className="headshot" src={headshot} alt="headshot" />
      <h3 className="name">{name}</h3>
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
