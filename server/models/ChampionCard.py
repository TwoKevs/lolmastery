from dataclasses import dataclass

@dataclass
class ChampionCard:
    champion_name: str
    champion_display_name: str
    champion_mastery: int
    champion_splash: str
    champion_last_played: int
    champion_splash_url: str = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/'

    def __post_init__(self):
        self.champion_splash_url= f'{self.champion_splash_url}{self.champion_splash}'
