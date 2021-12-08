import fetch from "node-fetch";
import { GlobalService } from "../globalService";

export class WeatherService extends GlobalService {

    private gpsApiKey: string = "Position stack API key";

    constructor() {
        super('Weather API Key');
    }

    public async getWeatherByCity(city: string): Promise<Object> {
        return await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).then((response) => {
            if (response.ok) {
                if (response.body != null) {
                    return response.text().then((value) => {
                        const json = JSON.parse(value);
                        return value;
                    });
                }
            }
            return null;
        });
    }

    public async getWeatherPollution(name: string, start: number, end: number): Promise<Object> {
        return await fetch(`http://api.positionstack.com/v1/forward?access_key=${this.gpsApiKey}&query=${name}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).then(async (response) => {
            if (response.ok) {
                if (response.body != null) {
                    return await response.text().then(async (value) => {
                        const json = JSON.parse(value);
                        const lat = json.data[0].latitude;
                        const lon = json.data[0].longitude;
                        return await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${this.apiKey}`, {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                        }).then((response) => {
                            if (response.ok) {
                                if (response.body != null) {
                                    return response.text().then((value) => {
                                        return JSON.parse(value);
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