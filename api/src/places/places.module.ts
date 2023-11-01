import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'entities';

@Module({
  providers: [PlacesService],
  exports: [PlacesService],
  imports: [TypeOrmModule.forFeature([Place])],
})
export class PlacesModule {}
