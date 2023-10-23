import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map, User } from 'entities';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { DEFAULT_MAP_NAME } from './lib/constants';
import { UsersService } from 'users/users.service';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map) private readonly mapsRepository: Repository<Map>,
    private readonly usersService: UsersService,
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

    return this.mapsRepository.save(map);
  }
}
