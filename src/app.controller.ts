import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(@Res() res): string {
    return res.redirect('/doc');
  }
}
