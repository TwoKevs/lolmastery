import React from 'react'
import { useState } from 'react'

const ChampCard = ({ displayName, mastery, splashNames, defaultSplash }) => {
    const [selected, setSelected] = useState(defaultSplash)
    const handleChange = (e) => {
        setSelected(e.target.value)
    }
    console.log(splashNames)
  return (
    <div className='card'>
      <label htmlFor="skins">Choose a skin to display:</label>
      <select name="skin" value={selected} onChange={handleChange}> 
      {Object.entries(splashNames)
      .map(([key ,value]) =>
      <option key={key} value={value}>{key}</option>
      )}
      </select>
      <img src={selected}/>
      <h2>{displayName}</h2>
      <h5>{mastery.toLocaleString()} Points</h5>
    </div>
  )
}

export default ChampCard