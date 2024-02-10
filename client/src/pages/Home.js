import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ChampCard from '../components/ChampCard.js';

const Home = () => {
  
  const [championsList, setChampionsList] = useState([]);

  const [sumName, setSumName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSearch = async () => {
    try {
        // const url = `/${sumName}/${tagLine}/most_played`
        const url = '/markmcguire/3434/most_played'
        const data = await axios.get(url)
        setChampionsList(data.data)
        console.log(data.data)
        setSumName("")
        setTagLine("")
      } catch (error) {
        console.error(error.message);
      }
      console.log('clist: ' + championsList)
  }

  return (
    <div>
      <div className="search-bar">
      <Form.Group className="m-0">
      <Form.Control
        className="textFeedback"
        rows="3"
        placeholder="Summoner Name#NA1"
        value={sumName}
        onChange={e => setSumName(e.target.value)}
        type="text"
      />
      <Form.Control
        className="textFeedback"
        rows="3"
        placeholder="Tagline"
        value={tagLine}
        onChange={e => setTagLine(e.target.value)}
        type="text"
      />
      <Button
        className="btnFormSend"
        variant="outline-success"
        onClick={handleSearch}
      >
        Search
      </Button>
    </Form.Group>
    </div>
      <div className="row">
      {championsList.map(champ => <ChampCard key={champ.champion_display_name} displayName={champ.champion_display_name} mastery={champ.champion_mastery} splashNames={champ.champion_splash_names} defaultSplash={champ.champion_splash_url}></ChampCard>)}
    </div>
  </div>
  )
}

export default Home