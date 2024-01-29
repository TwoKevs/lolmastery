from dataclasses import dataclass
from typing import List

@dataclass
class Summoner:
    champion_name: str
    kills: str
    deaths: str
    assists: str
    dmg_dealt: str
    win: bool
    name_tagline: str
    puuid: str