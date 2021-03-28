import React from 'react';

export default function teamMember(props) {
  // will be receiving team member info in props
  
  return (
    <div className ='teamMember'>
      <h1 className="name">JOE SCHMO</h1>
      <div className="teamMemberLinks">
        <p>LinkedIn</p>
        <p>GitHub</p>
      </div>
    </div>
  )
}
