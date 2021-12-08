import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginService } from "./login.service";

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('/login')
    login(@Body() body): Object {
        const json = body.body;
        return this.loginService.login(json.username, json.password, json.auth_type, json.auth_id);
    }

    @Post('/register')
    register(@Body() body): Object {
        const json = body.body;
        return this.loginService.register(json.username, json.password, json.auth_type, json.auth_id);
    }
}