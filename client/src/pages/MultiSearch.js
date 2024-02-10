import React from 'react'
import { multiList } from '../dummyData.js';
import MultiCard from '../components/MultiCard.js';


const MultiSearch = () => {
  return (
    <div className="row">
      <h1>test</h1>
    {multiList.map(player => MultiCard(player.game_name, player.top_champions))}
  </div>
  )
}

export default MultiSearch