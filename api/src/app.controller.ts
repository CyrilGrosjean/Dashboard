import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/about.json')
  getAbout(@Request() req) {
    return this.appService.getAbout(req.ip.slice(7));
  }

  @Post('/widget/add')
  addWidget(@Body() body) {
    const json = body.body;
    return this.appService.addWidget(json.userId, json.serviceId, json.widgetId, json.id);
  }

  @Post('/widget/remove')
  removeWidget(@Body() body) {
    const json = body.body;
    return this.appService.removeWidget(json.userId, json.id);
  }

  @Post('/widget/update')
  updateWidget(@Body() body) {
    const json = body.body;
    return this.appService.updateWidget(json);
  }

  @Post('/widget/get')
  getWidgets(@Body() body) {
    const json = body.body;
    return this.appService.getWidgets(json.userId);
  }

}
