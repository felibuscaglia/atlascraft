import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { MapsService } from './maps.service';

@Controller('maps')
@UseGuards(JwtGuard)
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}
  @Get()
  getUserMaps(@CurrentUser('id') userId: string) {
    return this.mapsService.findByUserId(userId);
  }

  @Get('/:mapId')
  async getMapById(@Param('mapId') mapId: string) {
    const map = this.mapsService.findById(mapId);

    if (map) {
      return map;
    } else {
      throw new NotFoundException();
    }
  }

  @Post()
  createMap(@CurrentUser('id') userId: string) {
    return this.mapsService.create(userId);
  }
}
