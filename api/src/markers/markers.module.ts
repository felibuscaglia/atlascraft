import { Module } from '@nestjs/common';
import { MarkersController } from './markers.controller';
import { MarkersService } from './markers.service';
import { PlacesModule } from 'places/places.module';
import { UsersModule } from 'users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from 'entities';

@Module({
  controllers: [MarkersController],
  providers: [MarkersService],
  imports: [PlacesModule, UsersModule, TypeOrmModule.forFeature([Marker])],
})
export class MarkersModule {}
