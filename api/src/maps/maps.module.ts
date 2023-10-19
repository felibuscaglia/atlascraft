import { Module } from '@nestjs/common';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from 'entities';

@Module({
  controllers: [MapsController],
  providers: [MapsService],
  imports: [TypeOrmModule.forFeature([Map])],
})
export class MapsModule {}
