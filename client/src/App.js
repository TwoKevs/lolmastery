import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import ChampionCard from './components/ChampionCard.js';
import { Form, Button } from "react-bootstrap";

function App() {
  const [search, setSearch] = useState({name: '', tag: ''});

  const onSubmit = () => {
    console.log(search);
  };

  const [championsList, setChampionsList] = useState([]);
  var obj = [
    {
      "champion_display_name": "Sion",
      "champion_last_played": 1702964391000,
      "champion_mastery": 443089,
      "champion_name": "Sion",
      "champion_splash": "Sion.png",
      "champion_splash_url": "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Sion.png"
    },
    {
      "champion_display_name": "Rengar",
      "champion_last_played": 1694137873000,
      "champion_mastery": 219342,
      "champion_name": "Rengar",
      "champion_splash": "Rengar.png",
      "champion_splash_url": "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Rengar.png"
    },
    {
      "champion_display_name": "Lee Sin",
      "champion_last_played": 1702961795000,
      "champion_mastery": 194265,
      "champion_name": "LeeSin",
      "champion_splash": "LeeSin.png",
      "champion_splash_url": "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/LeeSin.png"
    },
    {
      "champion_display_name": "Yasuo",
      "champion_last_played": 1699148425000,
      "champion_mastery": 169141,
      "champion_name": "Yasuo",
      "champion_splash": "Yasuo.png",
      "champion_splash_url": "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Yasuo.png"
    },
    {
      "champion_display_name": "Zed",
      "champion_last_played": 1702802202000,
      "champion_mastery": 167499,
      "champion_name": "Zed",
      "champion_splash": "Zed.png",
      "champion_splash_url": "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Zed.png"
    }
  ]

  useEffect(() => {
    const fetchList = async () =>{
      try {
        const {data: response} = await axios.get(`/list`);
        setChampionsList(response)
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchList();
  }, []);
  
  // console.log(championsList)

  const ChampionComponent = ({ championName }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
  
    useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await axios.get(`/splash/${championName}`);
          setData(({
            splashName: response.splashName,
            splashUrl: response.splashUrl}))
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }
  
      fetchData();
    }, []);
    return (
      <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <p>{data.splashName}</p>
          <img src={data.splashUrl}/>
        </div>
      )}
      </div>
    )
  }
  
  function handleSearch(e) {
    e.preventDefault();
    console.log(e);
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
          placeholder="Summoner Name#NA1"
          value={search.name}
          onChange={e => setSearch({ name: e.target.value })}
          type="text"
        />
        <Button
          className="btnFormSend"
          variant="outline-success"
          onClick={onSubmit}
        >
          Search
        </Button>
      </Form.Group>
      </div>
      </header>
      <div className="Card-list">
        {obj.map((o,i) => (ChampionCard(o)))}
      </div>
    </div>
  );
}

export default App;