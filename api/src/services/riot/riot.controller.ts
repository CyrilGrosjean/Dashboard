import { Body, Controller, Get, Post } from "@nestjs/common";
import { RiotService } from "./riot.service";

@Controller()
export class RiotController {
    constructor(private readonly riotService: RiotService) {}

    @Get('/riot/rotations')
    getRotations(): Object {
        return this.riotService.getRotations();
    }

    @Post('/riot/lastmatch')
    getLastMatch(@Body() body): Object {
        const json = body.body;
        return this.riotService.getLastMatch(json.name);
    }
}