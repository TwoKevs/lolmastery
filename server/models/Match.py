from dataclasses import dataclass
from typing import List
from models.Summoner import Summoner


@dataclass
class Match:
    match_duration: str
    game_mode: str
    summoners: List[Summoner]
    
    