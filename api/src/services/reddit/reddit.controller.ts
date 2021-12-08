import { Body, Controller, Get, Post } from "@nestjs/common";
import { RedditService } from "./reddit.service";

@Controller()
export class RedditController {
    constructor(private readonly redditService: RedditService) {}

    @Get('/reddit/authenticate')
    getRedditAuthenticateUrl(): Object {
        return {link: this.redditService.getAuthenticationPage(1)};
    }

    @Post('/reddit/authenticate')
    checkRedditAuthenticate(@Body() body): Object {
        const json = body.body;
        return this.redditService.returnAuthentication(json.state, json.access_token, json.user);
    }

    @Post('/reddit/profile')
    getRedditProfile(@Body() body): Object {
        const json = body.body;
        return this.redditService.getProfile(json.id);
    }
}