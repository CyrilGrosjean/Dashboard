import { Body, Controller, Get, Post } from "@nestjs/common";
import { YoutubeService } from "./youtube.service";

@Controller()
export class YoutubeController {
    constructor(private readonly youtubeService: YoutubeService) {}

    @Post('/youtube/stats')
    getChannelStats(@Body() body): Object {
        const json = body.body;
        return this.youtubeService.getChannelStats(json.name);
    }

    @Post('/youtube/video')
    getLastYoutubeVideo(@Body() body): Object {
        const json = body.body;
        return this.youtubeService.getLastVideo(json.name);
    }
}