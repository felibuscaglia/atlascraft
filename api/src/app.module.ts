import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MapsModule } from './maps/maps.module';
import { MarkersModule } from './markers/markers.module';
import { PlacesModule } from './places/places.module';
import { LayersModule } from './layers/layers.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MapsModule,
    MarkersModule,
    PlacesModule,
    LayersModule,
    CollaboratorsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
