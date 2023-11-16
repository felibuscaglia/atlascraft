import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map, User } from 'entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DEFAULT_MAP_NAME } from './lib/constants';
import { UsersService } from 'users/users.service';
import { LayersService } from 'layers/layers.service';
import { UpdateMapDto } from './dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map) private readonly mapsRepository: Repository<Map>,
    private readonly usersService: UsersService,
    private readonly layersService: LayersService,
  ) {}

  public findByUserId(userId: string) {
    return this.mapsRepository
      .createQueryBuilder('map')
      .leftJoin('map.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  public findOne(
    whereOptions: FindOptionsWhere<Map>,
    relations: string[] = [],
  ) {
    return this.mapsRepository.findOne({
      where: whereOptions,
      relations,
    });
  }

  public async create(ownerId: string) {
    const map = new Map();

    map.name = DEFAULT_MAP_NAME;
    map.users = [await this.usersService.findOne({ id: ownerId })];
    map.layers = [await this.layersService.create()];

    return this.mapsRepository.save(map);
  }

  public delete(mapId: string) {
    return this.mapsRepository.delete({ id: mapId });
  }

  public update(mapId: string, dto: UpdateMapDto) {
    return this.mapsRepository.save({
      id: mapId,
      ...dto,
    });
  }

  public async addUser(id: string, user: User) {
    const map = await this.findOne({ id }, ['users']);

    if (!map) {
      throw new NotFoundException('Map not found.');
    }

    if (map.users.find((user) => user.id === user.id)) {
      throw new ConflictException(
        `User with email '${user.email}' is already a collaborator for this map`,
      );
    }

    map.users = [...map.users, user];

    return await this.mapsRepository.save(map);
  }
}
