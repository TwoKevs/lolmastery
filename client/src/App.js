import { useState } from 'react';
import axios from "axios";
import './App.css';
import ChampionCard from './components/ChampionCard.js';
import { Form, Button } from "react-bootstrap";

function App() {

  const [sumName, setSumName] = useState("");
  const [tagLine, setTagLine] = useState("");

 
  const [championsList, setChampionsList] = useState([]);
  
  const handleSearch = async () => {
    try {
        const url = `/${sumName}/${tagLine}/most_played`
        const data = await axios.get(url)
        setChampionsList(data.data)
        console.log(data.data)
        setSumName("")
        setTagLine("")
      } catch (error) {
        console.error(error.message);
      }
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
      
      <div className="Card-list">
        {championsList > 0 ?
        championsList.map((o,i) => (ChampionCard(o)))
        : <h1 style={{color:'white'}}>BRAD YOURE GAY</h1>
        }
      </div>
    </div>
  );
}

export default App;