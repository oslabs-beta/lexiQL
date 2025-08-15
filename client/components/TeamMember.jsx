import React from 'react';
import GitHubIcon from '../assets/white-github.png';
import LinkedinIcon from '../assets/white-linkedin.png';

export default function TeamMember({ name, headshot, github, linkedin }) {
  return (
    <div className="teamMember">
      <img
        className="headshot"
        src={headshot}
        alt={`${name} headshot photo`}
        width="200"
        height="200"
        loading="lazy"
        decoding="async"
      />
      <h3 className="name">{name}</h3>
      <div className="teamMemberLinks">
        <img
          src={GitHubIcon}
          className="siteLogos"
          alt="GitHub Profile Link"
          width="24"
          height="24"
          loading="lazy"
          decoding="async"
          onClick={() => window.open(github)}
        />
        <img
          src={LinkedinIcon}
          className="siteLogos"
          alt="LinkedIn Profile Link"
          width="24"
          height="24"
          loading="lazy"
          decoding="async"
          onClick={() => window.open(linkedin)}
        />
      </div>
    </div>
  );
}
