from dataclasses import dataclass
from typing import List
from models.ChampionCard import ChampionCard

@dataclass
class SummonerCard:
    game_name: str
    tag_line: str
    top_champions: List[ChampionCard]
