import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Layer } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class LayersService {
    constructor(
        @InjectRepository(Layer) private readonly layersRepository: Repository<Layer>
    ) { }

    public findOne(
        whereOptions: FindOptionsWhere<Layer>,
        relations: string[] = [],
    ) {
        return this.layersRepository.findOne({
            where: whereOptions,
            relations,
        });
    }

    public create() {
        const newLayer = new Layer();

        return this.layersRepository.save(newLayer);
    }
}
