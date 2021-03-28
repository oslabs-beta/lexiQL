import React from 'react';
import TeamMember from '../components/teamMember';
import { useHomePageContext } from '../state/contexts';

export default function aboutUsContainer() {
  const { teamMembers } = useHomePageContext().homePageState;

  const teamMemInfo = teamMembers.map((teammate, index) => {
    return <TeamMember key={index} name={teammate.name} headshot={teammate.headshot} github={teammate.github} linkedin={teammate.linkedin} />
  });

  // const teamMemInfo = [];
  // for (let i = 0; i < 4; i++) {
  //   teamMemInfo.push(<TeamMember />);
  // }

  return (
    <div className ='teamContainer'>
      <h3>TEAM MEMBERS:</h3>
      <div id="allCards">
        {teamMemInfo}
      </div>
    </div>
  );
}
