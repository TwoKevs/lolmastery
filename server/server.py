from flask import Flask, request
import requests
import json
from pprint import pprint
from models.ChampionCard import ChampionCard
from models.SummonerCard import SummonerCard
from models.Match import Match
from models.Summoner import Summoner
import properties

app = Flask(__name__)


from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.mastery_db

db_champions = db.champions


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
        skinList = {}
        champion_name_id = (id_to_champ_name[champ['championId']])
        d_drag_data = champ_array[champion_name_id]

        #The main champ array does NOT return specific objects such as skins
        #Have to hit this endpoint in order to get skins for champions
        #Make a list, call specific champ endpoint to add skins to champ card
        url_get_skins = f'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/{champion_name_id}.json'
        res = requests.get(url_get_skins)
        skins = json.loads(res.text)['data'][champion_name_id]['skins']
        for skin in skins:
            num = skin['num']
            skinList.update({skin['name']:f'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{champion_name_id}_{num}.jpg'})

        print(skinList)
        cc = ChampionCard(champion_name = champion_name_id,
        champion_display_name=d_drag_data['name'],
        champion_mastery=champ['championPoints'],
        champion_splash=d_drag_data['image']['full'],
        champion_last_played=champ['lastPlayTime'],
        champion_splash_names=skinList)
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

@app.route('/matches/<gamename>/<tagline>')
def get_match_history(gamename, tagline):
    match_count = 5
    puuid = get_user_puuid(gamename=gamename, tagline=tagline)
    url_get_match_history = f'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count={match_count}'
    res = requests.get(url_get_match_history, headers={"X-Riot-Token":properties.RGAPI_KEY})
    matchIds = json.loads(res.text)
    print(matchIds)
    matchesInfo = []
    for matchId in matchIds:
        url_match = f'https://americas.api.riotgames.com/lol/match/v5/matches/{matchId}'    
        res = requests.get(url_match, headers={"X-Riot-Token":properties.RGAPI_KEY})
        matchInfo = json.loads(res.text)
        sum_list = []
        duration = matchInfo['info']['gameDuration']
        mode = matchInfo['info']['gameMode']
        summoner_info = matchInfo['info']['participants']
        for sum in summoner_info:
            champ = sum['championName']
            kills = sum['kills']
            deaths = sum['deaths']
            assists = sum['assists']
            dmg = sum['totalDamageDealt']
            win = sum['win']
            id = sum['puuid']
            name_tag = sum['riotIdGameName'] +  " " + sum['riotIdTagline']
            summoner = Summoner(champion_name=champ, kills=kills, deaths=deaths, assists=assists, dmg_dealt=dmg, win=win, name_tagline=name_tag, puuid=id)
            sum_list.append(summoner)
        match = Match(match_duration=duration, game_mode=mode, summoners=sum_list)
        matchesInfo.append(match)
    return matchesInfo


def get_user_puuid(gamename, tagline):
    url_get_puuid = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gamename}/{tagline}'
    res = requests.get(url_get_puuid, headers={"X-Riot-Token":properties.RGAPI_KEY})
    puuid_response = json.loads(res.text)
    return puuid_response['puuid']


@app.route('/db-insert')
def db_insert_champions():
    # for champ in champ_array:
    #     db_champions.insert_one({"_id": champ_array[champ]["key"], "champion": champ_array[champ]})
    # ret = db_champions.insert_many(champ_array)
    # print(ret.inserted_ds)
    return champ_array
    
def get_name_by_puuid(puuid):
    url_get_name = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/{puuid}'
    res = requests.get(url_get_name, headers={"X-Riot-Token":properties.RGAPI_KEY})
    name_response = json.loads(res.text)
    return name_response['gameName'] + name_response['tagLine']
