import React from 'react'

export default function ChampionCard(obj) {
  return (
    <div className='card'>
      <header className='card-head'>
        <img src={obj.champion_splash_url}/>
        <h2 >{obj.champion_display_name}</h2>
      </header>
        <div>
          <h5>{obj.champion_mastery.toLocaleString()} Points</h5>
        </div>
    </div>
  );
}