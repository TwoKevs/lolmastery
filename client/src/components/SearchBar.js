import { useState } from 'react';
import axios from "axios";
import '../App.css';
import ChampionCard from './ChampionCard.js';
import { Form, Button } from "react-bootstrap";
import ChampCard from './ChampCard.js';
import { multiList } from '../dummyData.js';
import MultiCard from './MultiCard.js';


const SearchBar = () => {

  return (
    <div>hello</div>
//     <div className="flexbox-container">
//     <Form.Group className="m-0">
//     <Form.Control
//       className="textFeedback"
//       rows="3"
//       placeholder="Summoner Name"
//       value={sumName}
//       onChange={e => setSumName(e.target.value)}
//       type="text"
//     />
//     <Form.Control
//       className="textFeedback"
//       rows="3"
//       placeholder="Tagline"
//       value={tagLine}
//       onChange={e => setTagLine(e.target.value)}
//       type="text"
//     />
//     <Button
//       className="btnFormSend"
//       variant="outline-success"
//       onClick={handleSearch}
//     >
//       Search
//     </Button>
//   </Form.Group>
//   </div>
  )
}

export default SearchBar