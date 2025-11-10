import React from 'react';
import './TeamMember.css';

function TeamMember({ name, position, bio, emoji }) {
  return (
    <div className="team-member">
      <div className="team-photo">
        <div className="team-photo-placeholder">{emoji}</div>
      </div>
      <div className="team-name">{name}</div>
      <div className="team-position">{position}</div>
      <div className="team-bio">{bio}</div>
    </div>
  );
}

export default TeamMember;