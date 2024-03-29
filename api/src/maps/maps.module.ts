import { Module, forwardRef } from '@nestjs/common';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from 'entities';
import { UsersModule } from 'users/users.module';
import { LayersModule } from 'layers/layers.module';

@Module({
  controllers: [MapsController],
  providers: [MapsService],
  imports: [
    TypeOrmModule.forFeature([Map]),
    UsersModule,
    forwardRef(() => LayersModule),
  ],
  exports: [MapsService],
})
export class MapsModule {}
