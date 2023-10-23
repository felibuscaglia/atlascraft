import { CanActivate, Injectable, ExecutionContext, NotFoundException } from '@nestjs/common';
import { MapsService } from 'maps/maps.service';

@Injectable()
export class MapAuthGuard implements CanActivate {
  constructor(private readonly mapsService: MapsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const mapId = request.params.id;
    const map = await this.mapsService.findById(mapId);

    if(!map) {
      throw new NotFoundException();
    }

    return true;
  }
}