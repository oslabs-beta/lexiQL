import React from 'react';
import TeamMember from '../components/teamMember';
import chrisHeadshot from '../assets/chris-headshot.png';
import johnHeadshot from '../assets/john-headshot.png';
import stacyHeadshot from '../assets/stacy-headshot.png';
import ryanHeadshot from '../assets/ryan-headshot.jpeg';

export default function aboutUsContainer() {
  const teamMembers = [
    // need to add Carney's LinkedIn when he makes a profile
    {
      name: 'Chris Carney',
      headshot: chrisHeadshot,
      github: 'https://github.com/Carthanial',
      linkedin: 'https://www.linkedin.com',
    },
    {
      name: 'Stacy Learn',
      headshot: stacyHeadshot,
      github: 'https://github.com/hello-stacy',
      linkedin: 'https://www.linkedin.com/in/stacy-learn/',
    },
    {
      name: 'John Li',
      headshot: johnHeadshot,
      github: 'https://github.com/john-li7',
      linkedin: 'https://www.linkedin.com/in/john-li-cpa-7327a380/',
    },
    {
      name: 'Ryan McDaniel',
      headshot: ryanHeadshot,
      github: 'https://github.com/ryanmcd118',
      linkedin: 'https://www.linkedin.com/in/ryanpmcdaniel/',
    },
  ];

  const teamMemInfo = [];
  for (let i = 0; i < teamMembers.length; i++) {
    const teammate = teamMembers[i];
    teamMemInfo.push(
      <TeamMember
        key={i}
        name={teammate.name}
        headshot={teammate.headshot}
        github={teammate.github}
        linkedin={teammate.linkedin}
      />,
    );
  }

  return (
    <div className="teamContainer">
      <h3>Meet the lexiQL team</h3>
      <div id="allCards">{teamMemInfo}</div>
    </div>
  );
}
