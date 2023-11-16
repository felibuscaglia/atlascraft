import { Module } from '@nestjs/common';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { UsersModule } from 'users/users.module';
import { MapsModule } from 'maps/maps.module';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  imports: [UsersModule, MapsModule]
})
export class CollaboratorsModule {}
