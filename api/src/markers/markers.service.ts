import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SaveMarkerDto } from './dto';
import { PlacesService } from 'places/places.service';
import { Layer, Marker, Place } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LayersService } from 'layers/layers.service';

@Injectable()
export class MarkersService {
  constructor(
    private readonly placesService: PlacesService,
    private readonly layersService: LayersService,
    @InjectRepository(Marker)
    private readonly markersRepository: Repository<Marker>,
  ) {}

  public async save(saveMarkerDto: SaveMarkerDto) {
    const layer = await this.layersService.findOne({
      id: saveMarkerDto.layerId,
    });

    if (!layer) {
      throw new InternalServerErrorException('Something unexpected happened.');
    }

    let place = await this.placesService.findOne({
      externalId: saveMarkerDto.externalId,
    });

    if (!place) {
      const { mapId, ...createPlaceDto } = saveMarkerDto;
      place = await this.placesService.create(createPlaceDto);
    }

    return this.create(place, layer);
  }

  public delete(id: string) {
    return this.markersRepository.delete({ id });
  }

  private create(place: Place, layer: Layer) {
    const marker = new Marker();

    marker.place = place;
    marker.layer = layer;

    return this.markersRepository.save(marker);
  }
}
