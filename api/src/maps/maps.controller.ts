import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { User } from 'entities';
import { MapsService } from './maps.service';

@Controller('maps')
@UseGuards(JwtGuard)
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}
  @Get()
  getUserMaps(@CurrentUser() user: User) {
    return user.maps;
  }

  @Post()
  createMap(@CurrentUser() user: User) {
    return this.mapsService.create(user);
  }
}
