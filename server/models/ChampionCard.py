from dataclasses import dataclass

@dataclass
class ChampionCard:
    champion_name: str
    champion_display_name: str
    champion_mastery: int
    champion_splash: str
    champion_last_played: int
    champion_splash_names: {}
    champion_splash_url: str = ''
    champion_loading_url: str = ''

    def __post_init__(self):
        self.champion_loading_url= f'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{self.champion_name}_0.jpg'
        self.champion_splash_url= f'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/{self.champion_name}.png'
