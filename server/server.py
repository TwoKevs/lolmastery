from flask import Flask, request
import requests
import json
from pprint import pprint
from models.ChampionCard import ChampionCard
from models.SummonerCard import SummonerCard
import properties

app = Flask(__name__)

# Expires: Mon, Dec 18th, 2023 @ 9:54am
champ_array = []
id_to_champ_name = {}

with app.app_context():
    url = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json'
    res = requests.get(url)
    champ_array = (json.loads(res.text))['data']
    cdict = {}
    for champ in champ_array:
        id_to_champ_name.update({int(champ_array[champ]['key']): champ})


@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route('/list')
def get_champion_list():
    url = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json'
    res = requests.get(url)
    jtext = json.loads(res.text)
    clist = []
    for champ in jtext['data']:
        clist.append(champ)
    return clist

@app.route('/ids/<name>')
def get_champion_id(name):
    url = f'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/{name}.json'
    res = requests.get(url)
    jtext = json.loads(res.text)
    
    return res.text

@app.route('/splash/<name>')
def get_champion_splash(name):
    url = f'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{name}_0.jpg'
    res_body = {
        "splashName": name,
        "splashUrl": url
    }
    return res_body


@app.route('/<gamename>/<tagline>/most_played')
def get_top_champions(gamename, tagline):
    puuid = get_user_puuid(gamename, tagline)

    url_get_mastery = f'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}'
    res = requests.get(url_get_mastery, headers={"X-Riot-Token":properties.RGAPI_KEY})
    mastery_response = json.loads(res.text)
    
    top5 = mastery_response[:5]
    cardArray = []
    for champ in top5:
        champion_name_id = (id_to_champ_name[champ['championId']])
        d_drag_data = champ_array[champion_name_id]
        cc = ChampionCard(champion_name = champion_name_id,
        champion_display_name=d_drag_data['name'],
        champion_mastery=champ['championPoints'],
        champion_splash=d_drag_data['image']['full'],
        champion_last_played=champ['lastPlayTime'])
        cardArray.append(cc)
    return cardArray

@app.route('/multi-search', methods=["POST"])
def get_multisearch():
    users = json.loads(request.data)
    summonerList = []
    for u in users:
        gamename = u['gameName']
        tagline = u['tagLine']
        cardArray = get_top_champions(gamename, tagline)
        sc = SummonerCard(gamename, tagline, cardArray)
        summonerList.append(sc)
    return summonerList

def get_user_puuid(gamename, tagline):
    url_get_puuid = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gamename}/{tagline}'
    res = requests.get(url_get_puuid, headers={"X-Riot-Token":properties.RGAPI_KEY})
    puuid_response = json.loads(res.text)
    return puuid_response['puuid']
