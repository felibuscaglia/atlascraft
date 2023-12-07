import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { SaveMarkerDto } from './dto';
import { MarkersService } from './markers.service';
import { MapAuthGuard } from 'maps/guards';
import { JwtGuard } from 'auth/guards';
import { UpdateMarkerDto } from './dto/update-marker.dto';

@Controller('markers')
@UseGuards(JwtGuard)
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post()
  @UseGuards(MapAuthGuard)
  async saveMarker(@Body() saveMarkerDto: SaveMarkerDto) {
    const { layer, ...marker } = await this.markersService.save(saveMarkerDto);
    return marker;
  }

  @Delete('/:markerId')
  @UseGuards(MapAuthGuard)
  deleteMarker(@Param('markerId') markerId: string) {
    return this.markersService.delete(markerId);
  }

  @Patch('/:markerId')
  @UseGuards(MapAuthGuard)
  updateMarker(
    @Param('markerId') markerId: string,
    @Body() updateMarkerDto: UpdateMarkerDto,
  ) {
    return this.markersService.update(markerId, updateMarkerDto);
  }
}
