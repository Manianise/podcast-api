import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('')
export class AppController {

  @Get()
  getHello() {
    return 'Hello World!'
  }
}
