import fetch from "node-fetch";
import { GlobalService } from "../globalService";

export class RiotService extends GlobalService {

    constructor() {
        super("Riot API Key");
    }

    private async getApiVersion(): Promise<Object> {
        return await fetch("https://ddragon.leagueoflegends.com/api/versions.json", {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).then((response) => {
            if (response.ok) {
                if (response.body !== null) {
                    return response.text().then((value) => {
                        const json = JSON.parse(value);
                        return json[0];
                    });
                }
            }
            return null;
        });
    }

    private async getChampionsById(): Promise<Object> {
        return this.getApiVersion().then(async (version) => {
            return await fetch("http://ddragon.leagueoflegends.com/cdn/" + version + "/data/fr_FR/champion.json", {
                method: 'GET',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).then((response) => {
                if (response.ok) {
                    if (response.body !== null) {
                        return response.text().then((value) => {
                            const json = JSON.parse(value);
                            var champions = {};
                            Object.keys(json.data).forEach((key) => {
                                champions[json.data[key].key] = [json.data[key].name, key];
                            });
                            return champions;
                        });
                    }
                }
                return null;
            });
        });
    }

    private parseLastMatch(json: any): Object {
        return this.getApiVersion().then((value) => {
            let winners = [];
            let losers = [];
            json.info.participants.forEach((obj) => {
                if (obj.win) {
                    winners.push({
                        icon: obj.profileIcon,
                        champion: obj.championName,
                        username: obj.summonerName,
                        kills: obj.kills,
                        deaths: obj.deaths,
                        assists: obj.assists,
                        gold: obj.goldEarned,
                        farm: obj.neutralMinionsKilled + obj.totalMinionsKilled,
                        damage: obj.totalDamageDealt,
                        vision: obj.visionScore,
                    });
                } else {
                    losers.push({
                        icon: obj.profileIcon,
                        champion: obj.championName,
                        username: obj.summonerName,
                        kills: obj.kills,
                        deaths: obj.deaths,
                        assists: obj.assists,
                        gold: obj.goldEarned,
                        farm: obj.neutralMinionsKilled + obj.totalMinionsKilled,
                        damage: obj.totalDamageDealt,
                        vision: obj.visionScore,
                    });
                }
            });
            const result = {
                duration: json.info.gameDuration,
                winners: winners,
                losers: losers,
                version: value.toString(),
            }
            return result;
        });
    }

    public async getRotations(): Promise<Object> {
        return await fetch("https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations", {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'X-Riot-Token': this.apiKey}
        }).then((response) => {
            if (response.ok) {
                if (response.body !== null) {
                    return response.text().then((value) => {
                        return this.getChampionsById().then((champions) => {
                            return this.getApiVersion().then((version) => {
                                const json = JSON.parse(value);
                            var rotation = {freeChampionIds: [], freeChampionIdsForNewPlayers: [], maxNewPlayerLevel: 0, version: ""};
                            json.freeChampionIds.forEach((value) => {
                                rotation.freeChampionIds.push(champions[value][1]);
                            });
                            json.freeChampionIdsForNewPlayers.forEach((value) => {
                                rotation.freeChampionIdsForNewPlayers.push(champions[value][1]);
                            });
                            rotation.maxNewPlayerLevel = json.maxNewPlayerLevel;
                            rotation.version = version.toString();
                            return rotation;
                            })
                        });
                    });
                }
            }
            return null;
        });
    }

    public async getLastMatch(name): Promise<Object> {
        return await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(name)}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'X-Riot-Token': this.apiKey}
        }).then((response) => {
            if (response.ok) {
                if (response.body != null) {
                    return response.text().then(async (value) => {
                        const jsonSummoner = JSON.parse(value);
                        const puuid = jsonSummoner.puuid;
                        return await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json; charset=UTF-8', 'X-Riot-Token': this.apiKey}
                        }).then(async (response) => {
                            if (response.ok) {
                                if (response.body != null) {
                                    return response.text().then(async (value) => {
                                        const jsonMatchId = JSON.parse(value);
                                        const matchId = jsonMatchId[0];
                                        return await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
                                            method: 'GET',
                                            headers: {'Content-Type': 'application/json; charset=UTF-8', 'X-Riot-Token': this.apiKey}
                                        }).then((response) => {
                                            if (response.ok) {
                                                if (response.body != null) {
                                                    return response.text().then((value) => {
                                                        const json = JSON.parse(value);
                                                        const result = this.parseLastMatch(json);
                                                        return result;
                                                    });
                                                }
                                            }
                                            return null;
                                        });
                                    });
                                }
                            }
                            return null;
                        });
                    });
                }
            }
            return null;
        });
    }

}