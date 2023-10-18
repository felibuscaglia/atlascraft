import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';

@Controller('maps')
@UseGuards(JwtGuard)
export class MapsController {
  @Get()
  getUserMaps(@CurrentUser() user: User) {
    console.log(user)
    return user.maps;
  }
}
