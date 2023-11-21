import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { MapAuthGuard } from 'maps/guards';
import { LayersService } from './layers.service';

@UseGuards(JwtGuard)
@Controller('layers')
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @UseGuards(MapAuthGuard)
  @Post()
  async createLayer(@Query('mapId') mapId: string) {
    return await this.layersService.create(mapId);
  }
}
