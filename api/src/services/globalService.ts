export class GlobalService {

    protected apiKey: string;
    protected oauth: boolean;

    constructor(apiKey: string, oauth: boolean = false) {
        this.apiKey = apiKey;
        this.oauth = oauth;
    }
}