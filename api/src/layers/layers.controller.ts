import {
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'auth/guards';
import { MapAuthGuard } from 'maps/guards';
import { LayersService } from './layers.service';
import { PatchLayerDto } from './dto/patch-layer.dto';

@UseGuards(JwtGuard)
@Controller('layers')
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @UseGuards(MapAuthGuard)
  @Post()
  async createLayer(@Query('mapId') mapId: string) {
    return await this.layersService.create(mapId);
  }

  @UseGuards(MapAuthGuard)
  @Patch('/:layerId')
  patchLayer(@Param('layerId') layerId: string, @Body() body: PatchLayerDto) {
    return this.layersService.update(layerId, body);
  }

  @UseGuards(MapAuthGuard)
  @Delete('/:layerId')
  deleteLayer(@Param('layerId') layerId: string) {
    return this.layersService.delete(layerId);
  }
}
