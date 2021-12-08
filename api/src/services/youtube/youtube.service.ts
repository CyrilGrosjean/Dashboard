import { GlobalService } from "../globalService";
import fetch from 'node-fetch';

export class YoutubeService extends GlobalService {
    constructor() {
        super("Youtube API Key");
    }

    public async getChannelStats(name: string): Promise<Object> {
        return await fetch(`https://www.googleapis.com/youtube/v3/search?q=${name}&key=${this.apiKey}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        }).then(async (response) => {
            if (response.ok) {
                if (response.body != null) {
                    return await response.text().then(async (value) => {
                        const json = JSON.parse(value);
                        const items = json.items;
                        let channelId = "";
                        for (const item of items) {
                            if (item.id.kind === 'youtube#channel') {
                                channelId = item.id.channelId;
                                break;
                            }
                        }
                        if (channelId == "") {
                            return null;
                        }
                        return await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${this.apiKey}`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json; charset=UTF-8'},
                        }).then(async (response) => {
                            if (response.ok) {
                                if (response.body != null) {
                                    return await response.text().then((value) => {
                                        const json = JSON.parse(value);
                                        const result = {
                                            views: json.items[0].statistics.viewCount,
                                            subscribers: json.items[0].statistics.subscriberCount,
                                            videos: json.items[0].statistics.videoCount,
                                        };
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
    }

    public async getLastVideo(name: string): Promise<Object> {
        return await fetch(`https://www.googleapis.com/youtube/v3/search?q=${name}&key=${this.apiKey}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        }).then(async (response) => {
            if (response.ok) {
                if (response.body != null) {
                    return await response.text().then(async (value) => {
                        const json = JSON.parse(value);
                        const items = json.items;
                        let channelId = "";
                        for (const item of items) {
                            if (item.id.kind === 'youtube#channel') {
                                channelId = item.id.channelId;
                                break;
                            }
                        }
                        if (channelId == "") {
                            return null;
                        }
                        return await fetch(`https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&order=date&key=${this.apiKey}`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json; charset=UTF-8'},
                        }).then(async (response) => {
                            if (response.ok) {
                                if (response.body != null) {
                                    return await response.text().then((value) => {
                                        const json = JSON.parse(value);
                                        const result = {
                                            link: `https://www.youtube.com/watch?v=${json.items[0].id.videoId}`
                                        };
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
    }
}