import React from 'react';
import TeamMember from '../components/teamMember';
// IMPORT RELEVANT CONTEXT HERE


export default function aboutUsContainer() {
  // THIS IS ALL TEMPORARY CODE
  // STATE MANAGEMENT NEEDED!
  const teamMembers = [];
  for (let i = 0; i < 4; i++) {
    teamMembers.push(<TeamMember />);
  }

  return (
    <div className ='teamContainer'>
      <h3>TEAM MEMBERS:</h3>
      <div id="allCards">
        {teamMembers}
      </div>
    </div>
  );
}
