/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post,Query } from '@nestjs/common';
import { CreateTerrainDTO } from './dtos/create-terrain.dto';
import { FilterTerrainDTO } from './dtos/filter-terrain.dto';
import { UpdateTerrainDTO } from './dtos/update-terrain.dto';
import { Terrain } from './schemas/terrain.schema';
import { TerrainService } from './terrain.service';

@Controller('terrains')
export class TerrainController {
  constructor(private readonly terrainService: TerrainService) {}

  @Get(':terrainId')
  async getTerrain(@Param('terrainId') terrainId: string): Promise<Terrain> {
    return this.terrainService.getTerrainById(terrainId);
  }

  @Get()
  async getTerrains(@Query() filterDTO: FilterTerrainDTO): Promise<Terrain[]> {
    if(Object.keys(filterDTO).length){
      return this.terrainService.getTerrainsWithFilters(filterDTO);
    } else {
      return this.terrainService.getTerrains();
    }
    
  }

  @Post()
  async createTerrain(@Body() createTerrainDTO: CreateTerrainDTO): Promise<Terrain> {
      return this.terrainService.createTerrain(createTerrainDTO)
  }

  @Patch(':terrainId')
  async updateTerrain(@Param('id') id: string, @Body() updateTerrainDTO: UpdateTerrainDTO): Promise<Terrain> {
      return this.terrainService.updateTerrain(id, updateTerrainDTO);
  }
  @Delete(':terrainId')
  async deleteTerrain(@Param('terrainId') terrainId: string): Promise<Terrain> {
    return this.terrainService.deleteTerrain(terrainId);
  }
}