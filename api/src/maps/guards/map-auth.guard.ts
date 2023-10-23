import {
  CanActivate,
  Injectable,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { MapsService } from 'maps/maps.service';

@Injectable()
export class MapAuthGuard implements CanActivate {
  constructor(private readonly mapsService: MapsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const mapId = request.params.mapId;

    const map = await this.mapsService.findOne({ id: mapId }, ['users']);

    if (!map) {
      throw new NotFoundException('Map not found.');
    }
    const userId = request.user?.id;

    const userOwnsMap =
      userId && !!map.users.find((user) => user.id === userId);

    if (!userOwnsMap) {
      throw new ForbiddenException(
        'User does not have edit rights for this map.',
      );
    }

    return true;
  }
}
