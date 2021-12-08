import {v4 as uuidv4} from 'uuid';
import { GlobalService } from "../globalService";
import { createConnection  } from 'typeorm';
import { Oauth } from 'src/database/entities/oauth.entity';
import { OauthRepository } from 'src/database/repositories/oauth.repository';
import fetch from "node-fetch";
import { Global } from '../../../globals';

export class RedditService extends GlobalService {

    private clientId: string = "Reddit client ID";
    private redirectUri: string = "redirect link";
    private connection;
    private states = [];

    constructor() {
        super('Reddit API key', true);
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

    private getAccessToken(userId: number): Promise<String> {
        const oAuthRepository = this.connection.getCustomRepository(OauthRepository);
        return oAuthRepository.findSpecificOauthByUserId(userId, Global.services.reddit).then((value) => {
            if (value) {
                return value.access_token;
            }
            return null;
        });
    }

    public getAuthenticationPage(userId: number): String {
        const uuid = userId.toString();
        let url = "https://ssl.reddit.com/api/v1/authorize?client_id=" + this.clientId + "&response_type=code&state=" + uuid + "&redirect_uri=" + encodeURIComponent(this.redirectUri) + "&duration=permanent&scope=identity";
        this.setState(uuid);

        return url;
    }

    public async returnAuthentication(state: string, accessToken: string, userId: number): Promise<boolean> {
        if (this.verifyState(state)) {
            const oAuthRepository = this.connection.getCustomRepository(OauthRepository);
            oAuthRepository.removeOauthFromUserId(userId, Global.services.reddit);
            await fetch(`https://ssl.reddit.com/api/v1/access_token`, {
                method: 'POST',
                body: `grant_type=authorization_code&code=${accessToken}&redirect_uri=${this.redirectUri}`,
                headers: {"User-agent": 'typescript:Dashboard:1.0 (by /u/YourName)',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic ' + Buffer.from(this.clientId + ":" + this.apiKey).toString('base64')},
            }).then((response) => {
                if (response.ok) {
                    if (response.body != null) {
                        response.text().then((value) => {
                            const result = JSON.parse(value);
                            oAuthRepository.insertOauth(userId, Global.services.reddit, result['access_token'], result['refresh_token']);
                            return true;
                        });
                    }
                    return false;
                }
                return false;
            });
            return true;
        }
        return false;
    }

    public async getProfile(userId: number): Promise<Object> {
        return await this.getAccessToken(userId).then(async (accessToken) => {
            if (accessToken === null) {
                return {link: this.getAuthenticationPage(userId)};
            }
            return await fetch(`https://oauth.reddit.com/api/v1/me`, {
                method: 'GET',
                headers: {'Authorization': 'bearer ' + accessToken,
                'User-agent': 'typescript:Dashboard:1.0 (by /u/YourName)',
                'Content-Type': 'application/json; charset=UTF-8'}
            }).then(async (response) => {
                if (response.headers.get('www-authenticate') == 'Bearer realm="reddit", error="invalid_token"') {
                    return {link: this.getAuthenticationPage(userId)};
                }
                if (response.ok) {
                    return await response.text().then((value) => {
                        const result = JSON.parse(value);
                        return result;
                    });
                }
                return {link: this.getAuthenticationPage(userId)};
            });
        });
    }
}