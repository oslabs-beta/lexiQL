import React from 'react';
import TeamCard from '../components/teamCard';
// IMPORT RELEVANT CONTEXT HERE


export default function teamContainer() {
  // THIS IS ALL TEMPORARY CODE
  // STATE MANAGEMENT NEEDED!
  const teamCards = [];
  for (let i = 0; i < 4; i++) {
    teamCards.push(<TeamCard />);
  }

  return (
    <div className ='teamContainer'>
      <h3>TEAM MEMBERS:</h3>
      <div id="allCards">
        {teamCards}
      </div>
    </div>
  );
}
