/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Terrain, TerrainSchema } from './schemas/terrain.schema';
import { TerrainController } from './terrain.controller';
import { TerrainRepository } from './terrain.repository';
import { TerrainService } from './terrain.service';


@Module({
  imports: [MongooseModule.forFeature([ {name: Terrain.name, schema: TerrainSchema}])],
  controllers: [TerrainController],
  providers: [TerrainService,TerrainRepository],
})
export class TerrainModule {}

