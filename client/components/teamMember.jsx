import React from 'react';
// import headshot from '../assets/empty-headshot.png';

// took out headshot from props
export default function teamMember({name, headshot, github, linkedin}) {
  return (
    <div className ='teamMember'>
      <img className="headshot" src={headshot} alt='headshot' />
      <h1 className="name">{name}</h1>
      <div className="teamMemberLinks">
        <a className="teamMemberLink" href={linkedin}>LinkedIn</a>
        <a className="teamMemberLink" href={github}>GitHub</a>
      </div>
    </div>
  )
}
