import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { CurrentUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { MapsService } from './maps.service';
import { MapAuthGuard } from './guards';
import { UpdateMapDto } from './dto';

@Controller('maps')
@UseGuards(JwtGuard)
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}
  @Get()
  getUserMaps(@CurrentUser('id') userId: string) {
    return this.mapsService.findByUserId(userId);
  }

  @Get('/:mapId')
  @UseGuards(MapAuthGuard)
  async getMapById(@Param('mapId') mapId: string) {
    return this.mapsService.findOne({ id: mapId }, [
      'layers',
      'layers.markers',
      'layers.markers.place',
      'users',
    ]);
  }

  @Get('/:mapId/view')
  async getMapView(@Param('mapId') mapId: string) {
    return this.getMapById(mapId);
  }

  @Post()
  createMap(@CurrentUser('id') userId: string) {
    return this.mapsService.create(userId);
  }

  @Delete('/:mapId')
  @UseGuards(MapAuthGuard)
  async deleteMap(@Param('mapId') mapId: string) {
    await this.mapsService.delete(mapId);

    return HttpStatus.OK;
  }

  @Patch('/:mapId')
  @UseGuards(MapAuthGuard)
  async updateMap(
    @Param('mapId') mapId: string,
    @Body() updateMapDto: UpdateMapDto,
  ) {
    return this.mapsService.update(mapId, updateMapDto);
  }
}
