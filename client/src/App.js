import { useState } from 'react';
import axios from "axios";
import './App.css';
import ChampionCard from './components/ChampionCard.js';
import { Form, Button } from "react-bootstrap";
import ChampCard from './components/ChampCard.js';

function App() {

  const [sumName, setSumName] = useState("");
  const [tagLine, setTagLine] = useState("");

 
  const [championsList, setChampionsList] = useState([]);
  // console.log('clist: ' + championsList)

  const handleMulti = async () => {
    try {
      axios({
        method: 'post',
        url: '/multi-search',
        data: {
          firstName: 'Kevin',
          lastName: 'Sullivan'
        }
      }).then((response) => {
        console.log(response)
      });
      } catch (error) {
        console.error(error.message);
      }
      // console.log('clist: ' + championsList)
  }

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
    <div className="App">
      <header className="App-header">
        <h1>League of Legends Champion Mastery</h1>
        <div className="flexbox-container">
        <Form.Group className="m-0">
        <Form.Control
          className="textFeedback"
          rows="3"
          placeholder="Summoner Name"
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
      </header>
     
      <div className="row">
        {/* {championsList.map((o,i) => (ChampionCard(o)))} */}
        {championsList.map(champ => <ChampCard key={champ.champion_display_name} displayName={champ.champion_display_name} mastery={champ.champion_mastery} splashNames={champ.champion_splash_names} defaultSplash={champ.champion_splash_url}></ChampCard>)}
      </div>
    </div>
  );
}

export default App;