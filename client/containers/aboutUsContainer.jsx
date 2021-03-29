import React from 'react';
import TeamMember from '../components/teamMember';
// import { useHomePageContext } from '../state/contexts';

export default function aboutUsContainer() {
  // const { teamMembers } = useHomePageContext().homePageState;

  const teamMembers = [
    // need to add Carney's LinkedIn when he makes a profile
    { name: 'Chris Carney', headshot: '../assets/empty-headshot.jpg', github: 'https://github.com/Carthanial', linkedin: 'https://www.linkedin.com' },
    { name: 'Stacy Learn', headshot: '../assets/empty-headshot.png', github: 'https://github.com/hello-stacy', linkedin: 'https://www.linkedin.com/in/stacy-learn/' },
    { name: 'John Li', headshot: '../assets/empty-headshot.png', github: 'https://github.com/john-li7', linkedin: 'https://www.linkedin.com/in/john-li-cpa-7327a380/' },
    { name: 'Ryan McDaniel', headshot: '../assets/empty-headshot.png', github: 'https://github.com/ryanmcd118', linkedin: 'https://www.linkedin.com/in/ryanpmcdaniel/' }
  ];

  const teamMemInfo = teamMembers.map((teammate, index) => {
    return <TeamMember key={index} name={teammate.name} headshot={teammate.headshot} github={teammate.github} linkedin={teammate.linkedin} />
  });

  return (
    <div className ='teamContainer'>
      <h3>TEAM MEMBERS:</h3>
      <div id="allCards">
        {teamMemInfo}
      </div>
    </div>
  );
}
