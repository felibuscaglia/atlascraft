import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Layer } from 'entities';
import { MapsService } from 'maps/maps.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PatchLayerDto } from './dto/patch-layer.dto';

@Injectable()
export class LayersService {
  constructor(
    @InjectRepository(Layer)
    private readonly layersRepository: Repository<Layer>,
    @Inject(forwardRef(() => MapsService))
    private readonly mapsService: MapsService,
  ) {}

  public findOne(
    whereOptions: FindOptionsWhere<Layer>,
    relations: string[] = [],
  ) {
    return this.layersRepository.findOne({
      where: whereOptions,
      relations,
    });
  }

  public async create(mapId?: string) {
    const newLayer = new Layer();

    if (mapId) {
      newLayer.map = await this.mapsService.findOne({ id: mapId });
    }

    return this.layersRepository.save(newLayer);
  }

  public update(id: string, dto: PatchLayerDto) {
    return this.layersRepository.save({
      id,
      ...dto,
    });
  }
}
