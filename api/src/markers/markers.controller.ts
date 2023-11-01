import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SaveMarkerDto } from './dto';
import { MarkersService } from './markers.service';
import { MapAuthGuard } from 'maps/guards';
import { JwtGuard } from 'auth/guards';

@Controller('markers')
@UseGuards(JwtGuard)
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post()
  @UseGuards(MapAuthGuard)
  saveMarker(@Body() saveMarkerDto: SaveMarkerDto) {
    return this.markersService.save(saveMarkerDto);
  }
}
