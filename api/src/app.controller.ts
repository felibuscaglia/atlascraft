import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  checkHealth(): HttpStatus {
    return HttpStatus.OK;
  }
}
