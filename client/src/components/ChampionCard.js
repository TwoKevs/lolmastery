import React from 'react'

export default function ChampionCard(obj) {
  return (
    <div className='card'>
      <label htmlFor="skins">Choose a skin to display:</label>
      <select name="skin" defaultValue="default"> 
      {Object.entries(obj.champion_splash_names)
      .map(([key ,value]) =>
      <option key={value} value={value} onChange={console.log(value + "AND" + key )}>{key}</option>
      )}
      </select>
      <img src={obj.champion_splash_url}/>
      <h2>{obj.champion_display_name}</h2>
      <h5>{obj.champion_mastery.toLocaleString()} Points</h5>
    </div>
  );
}