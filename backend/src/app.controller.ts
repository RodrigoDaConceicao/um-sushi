import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/menu')
  getMenu() {
    return this.appService.getMenu();
  }

  @Post('order')
  createOrder(@Body() items) {
    return this.appService.createOrder(items);
  }

}
