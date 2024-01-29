import React from 'react'
import { useState } from 'react'

const MultiRow = ({ display_name, splash_image, champion_mastery, champion_last_played}) => {
  return (
    <div className='multi-row'>
        <div style={{display: 'flex'}}>
            <img className="sprite-img" src={splash_image} />
            <h2>{display_name}</h2>
        </div>
            <h5>{champion_mastery.toLocaleString()} Points</h5>
            <h5>{champion_last_played}</h5>
    </div>
  )
}

export default MultiRow