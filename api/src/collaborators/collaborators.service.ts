import { Injectable, NotFoundException } from '@nestjs/common';
import { MapsService } from 'maps/maps.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mapsService: MapsService,
  ) {}

  public async invite(mapId: string, userEmail: string) {
    const user = await this.usersService.findOne({ email: userEmail });

    if (!user) {
      throw new NotFoundException(`User with email '${userEmail}' was not found`);
    }

    return await this.mapsService.addUser(mapId, user);
  }
}
