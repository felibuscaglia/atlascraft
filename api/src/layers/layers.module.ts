import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Layer } from 'entities';
import { LayersService } from './layers.service';

@Module({
  providers: [LayersService],
  imports: [TypeOrmModule.forFeature([Layer])],
  exports: [LayersService]
})
export class LayersModule {}
