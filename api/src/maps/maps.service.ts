import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map, User } from 'entities';
import { Repository } from 'typeorm';
import { DEFAULT_MAP_NAME } from './lib/constants';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map) private readonly mapsRepository: Repository<Map>,
  ) {}

  public create(user: User) {
    const map = new Map();

    map.name = DEFAULT_MAP_NAME;
    map.users = [user];

    return this.mapsRepository.save(map);
  }
}
