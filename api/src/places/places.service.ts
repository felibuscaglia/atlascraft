import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
  ) {}
  public findOne(whereOptions: FindOptionsWhere<Place>) {
    return this.placesRepository.findOne({
      where: whereOptions,
    });
  }

  public create(createPlaceDto: Omit<Place, 'id' | 'markers'>) {
    const newPlace = new Place();

    newPlace.displayName = createPlaceDto.displayName;
    newPlace.externalId = createPlaceDto.externalId;
    newPlace.latitude = createPlaceDto.latitude;
    newPlace.longitude = createPlaceDto.longitude;
    newPlace.name = createPlaceDto.name;
    newPlace.type = createPlaceDto.type;

    return this.placesRepository.save(newPlace);
  }
}
