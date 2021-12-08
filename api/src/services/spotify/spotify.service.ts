import { Global } from '../../../globals';
import { Oauth } from 'src/database/entities/oauth.entity';
import { OauthRepository } from 'src/database/repositories/oauth.repository';
import { createConnection } from 'typeorm';
import {v4 as uuidv4} from 'uuid';
import { GlobalService } from "../globalService";
import fetch from 'node-fetch';

export class SpotifyService extends GlobalService {

    private clientId = 'Spotify Client ID';
    private callback = 'Redirect link';
    private connection;
    private states = [];

    constructor() {
        super('Spotify API Key', true);
        this.getConnection();
    }

    private async getConnection() {
        this.connection = await createConnection({
            type: 'postgres',
            url: 'postgres://user:password@postgres:5432/postgres',
            entities: [Oauth],
        });
    }

    private setState(state: string): boolean {
        this.states.push(state);
        return true;
    }

    private verifyState(state: string): boolean {
        const potentialState = this.states.indexOf(state);

        if (potentialState == -1) {
            return false;
        }
        this.states.splice(potentialState, 1);
        return true;
    }

    public getLink(userId: number): Object {
        var state = userId.toString();
        var scope = 'user-read-private user-read-email';

        this.setState(state);
        let url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(this.callback)}&state=${state}`;
        return {link: url};
    }

    public async returnAuthentication(state: string, code: string, userId: number): Promise<boolean> {
        if (this.verifyState(state)) {
            const oAuthRepository = this.connection.getCustomRepository(OauthRepository);
            oAuthRepository.removeOauthFromUserId(userId, Global.services.spotify);
            return await fetch(`https://accounts.spotify.com/api/token`, {
                method: 'POST',
                body: `code=${code}&redirect_uri=${this.callback}&grant_type=authorization_code`,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.apiKey).toString('base64')}
            }).then((response) => {
                if (response.ok) {
                    if (response.body != null) {
                        return response.text().then((value) => {
                            const result = JSON.parse(value);
                            oAuthRepository.insertOauth(userId, Global.services.spotify, result['access_token'], result['refresh_token']);
                            return true;
                        });
                    }
                }
                return false;
            });
        }
        return false;
    }

    public async getArtistStats(name: string, userId: number): Promise<Object> {
        const oAuthRepository = this.connection.getCustomRepository(OauthRepository);
        return oAuthRepository.findSpecificOauthByUserId(userId, Global.services.spotify).then(async (responseDb) => {
            if (responseDb) {
                const accessToken = responseDb.access_token;
                return await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + accessToken,
                    }
                }).then((response) => {
                    if (response.ok) {
                        if (response.body != null) {
                            return response.text().then((value) => {
                                const artists = JSON.parse(value);
                                const artist = artists.artists.items[0];
                                return {
                                    followers: artist.followers.total,
                                    genres: artist.genres,
                                    logo: artist.images[0].url,
                                    id: artist.id,
                                    name: artist.name,
                                    popularity: artist.popularity,
                                };
                            });
                        }
                    }
                    return this.getLink(userId);
                });
            }
            return this.getLink(userId);
        });
    }

    public async getTrack(name: string, userId: number): Promise<Object> {
        const oAuthRepository = this.connection.getCustomRepository(OauthRepository);
        return oAuthRepository.findSpecificOauthByUserId(userId, Global.services.spotify).then(async (responseDb) => {
            if (responseDb) {
                const accessToken = responseDb.access_token;
                return await fetch(`https://api.spotify.com/v1/search?q=${name}&type=track`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + accessToken,
                    }
                }).then((response) => {
                    if (response.ok) {
                        if (response.body != null) {
                            return response.text().then((value) => {
                                const tracks = JSON.parse(value);
                                const track = tracks.tracks.items[0];
                                return {result: "track/" + track.id};
                            });
                        }
                    }
                    return this.getLink(userId);
                });
            }
            return this.getLink(userId);
        });
    }
}