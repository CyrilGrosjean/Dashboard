import { Body, Controller, Get, Post } from "@nestjs/common";
import { SpotifyService } from "./spotify.service";

@Controller()
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Get('/spotify/login')
    getLink(): Object {
        return this.spotifyService.getLink(1);
    }

    @Post('/spotify/login')
    setAccessToken(@Body() body): Object {
        const json = body.body;
        return this.spotifyService.returnAuthentication(json.state, json.code, json.user);
    }

    @Post('/spotify/artist')
    getArtist(@Body() body): Object {
        const json = body.body;
        return this.spotifyService.getArtistStats(json.name, json.userId);
    }

    @Post('/spotify/track')
    getTrack(@Body() body): Object {
        const json = body.body;
        return this.spotifyService.getTrack(json.name, json.userId);
    }
}