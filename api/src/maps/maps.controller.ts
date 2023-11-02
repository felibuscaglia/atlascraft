import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { MapsService } from './maps.service';
import { MapAuthGuard } from './guards';

@Controller('maps')
@UseGuards(JwtGuard)
export class MapsController {
  constructor(private readonly mapsService: MapsService) { }
  @Get()
  getUserMaps(@CurrentUser('id') userId: string) {
    return this.mapsService.findByUserId(userId);
  }

  @UseGuards(MapAuthGuard)
  @Get('/:mapId')
  async getMapById(@Param('mapId') mapId: string) {
    return this.mapsService.findOne({ id: mapId }, ['layers', 'layers.markers', 'layers.markers.place']);
  }

  @Post()
  createMap(@CurrentUser('id') userId: string) {
    return this.mapsService.create(userId);
  }
}
