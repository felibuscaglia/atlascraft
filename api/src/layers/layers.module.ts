import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Layer } from 'entities';
import { LayersService } from './layers.service';
import { LayersController } from './layers.controller';
import { MapsModule } from 'maps/maps.module';

@Module({
  providers: [LayersService],
  imports: [
    TypeOrmModule.forFeature([Layer]),
    forwardRef(() => MapsModule),
  ],
  exports: [LayersService],
  controllers: [LayersController],
})
export class LayersModule {}
