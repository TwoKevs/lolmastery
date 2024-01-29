import React from 'react'
import MultiRow from './MultiRow.js';

export default function MultiCard(player_name, obj) {
  return (
    <div className='multi-card'>
      <h3>{player_name}</h3>
      {obj.map(o => <MultiRow display_name={o.champion_display_name}
      splash_image={o.champion_splash_url}
      champion_mastery={o.champion_mastery}
      champion_last_played={o.champion_last_played} />)}
    </div>
  );
}