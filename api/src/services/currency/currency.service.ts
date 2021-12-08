import { GlobalService } from "../globalService";
import fetch from 'node-fetch';

export class CurrencyService extends GlobalService {

    constructor() {
        super('free currency api key');
    }

    public async getExchange(from: string, to: string): Promise<Object> {
        return await fetch(`https://freecurrencyapi.net/api/v2/latest?base_currency=${from}&apikey=${this.apiKey}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
        }).then(async (response) => {
            if (response.ok) {
                if (response.body != null) {
                    return await response.text().then((value) => {
                        const json = JSON.parse(value);
                        return json.data[to];
                    });
                }
            }
            return null;
        });
    }

    public async getExchangeCrypto(from: string, to: string): Promise<Object> {
        return await fetch(`https://rest.coinapi.io/v1/exchangerate/${from}/${to}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8',
                'X-CoinAPI-Key': 'coin api key'}
        }).then(async (response) => {
            if (response.ok) {
                if (response.body != null) {
                    return await response.text().then((value) => {
                        const json = JSON.parse(value);
                        return json.rate;
                    });
                }
            }
            return null;
        });
    }
}