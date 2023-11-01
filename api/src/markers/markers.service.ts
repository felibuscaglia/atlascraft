import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SaveMarkerDto } from './dto';
import { PlacesService } from 'places/places.service';
import { Map, Marker, Place } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsService } from 'maps/maps.service';

@Injectable()
export class MarkersService {
  constructor(
    private readonly placesService: PlacesService,
    private readonly mapsService: MapsService,
    @InjectRepository(Marker)
    private readonly markersRepository: Repository<Marker>,
  ) { }

  public async save(saveMarkerDto: SaveMarkerDto) {
    const map = await this.mapsService.findOne({ id: saveMarkerDto.mapId });

    if (!map) {
      throw new InternalServerErrorException('Something unexpected happened.');
    }

    let place = await this.placesService.findOne({
      externalId: saveMarkerDto.externalId,
    });

    if (!place) {
      const { mapId, ...createPlaceDto } = saveMarkerDto;
      place = await this.placesService.create(createPlaceDto);
    }

    return this.create(place, map);
  }

  private create(place: Place, map: Map) {
    const marker = new Marker();

    marker.place = place;
    marker.map = map;

    return this.markersRepository.save(marker);
  }
}
