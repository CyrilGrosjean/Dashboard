import { Body, Controller, Post } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller()
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Post('/weather/city')
    getWeatherByCity(@Body() body): Object {
        const json = body.body;
        return this.weatherService.getWeatherByCity(json.city);
    }

    @Post('/weather/pollution')
    getWeatherPollution(@Body() body): Object {
        const json = body.body;
        return this.weatherService.getWeatherPollution(json.city, json.start, json.end);
    }
}