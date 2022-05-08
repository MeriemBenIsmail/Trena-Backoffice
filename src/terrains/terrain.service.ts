/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateTerrainDTO } from "./dtos/update-terrain.dto";
import { CreateTerrainDTO } from "./dtos/create-terrain.dto";
import { Terrain } from "./schemas/terrain.schema";
import { TerrainRepository } from "./terrain.repository";
import { FilterTerrainDTO } from "./dtos/filter-terrain.dto";

@Injectable()
export class TerrainService {
    constructor(private readonly terrainRepository: TerrainRepository) {}

    async getTerrainById(terrainId: string): Promise<Terrain> {
        return this.terrainRepository.findOne({ terrainId })
    }

    async getTerrains(): Promise<Terrain[]> {
        return this.terrainRepository.find({});
    }
    async getTerrainsWithFilters(filterDTO: FilterTerrainDTO): Promise<Terrain[]> {
        let search = filterDTO.search;
        let type = filterDTO.type;
        const available = filterDTO.available;
        // eslint-disable-next-line prefer-const
        let terrains = await this.getTerrains();
        
        //filtering
        if(type) {
            type = type.toLowerCase();
            terrains = terrains.filter(terrain => terrain.type.toLowerCase() === type);
        }
        if(search) {
            search = search.toLowerCase()
            terrains = terrains.filter(terrain => 
                terrain.title.toLowerCase().includes(search) || 
                terrain.description.toLowerCase().includes(search) || 
                terrain.address.toLowerCase().includes(search) || 
                terrain.type.toLowerCase().includes(search) 
                );
        }
       
       if(available) {
        
            terrains = terrains.filter(terrain => terrain.available == true);
       } else {
  
            terrains = terrains.filter(terrain => terrain.available == false);
       }

        return terrains;
    }

    async createTerrain(createTerrainDTO: CreateTerrainDTO): Promise<Terrain> {
        return this.terrainRepository.create({
            id: uuidv4(),
            ...createTerrainDTO
        })
    }

    async updateTerrain(terrainId: string, terrainUpdates: UpdateTerrainDTO): Promise<Terrain> {
        return this.terrainRepository.findOneAndUpdate({ terrainId }, terrainUpdates);
    }
    async deleteTerrain(terrainId: string): Promise<Terrain> {
        return this.terrainRepository.findOneAndDelete({ terrainId });
    }
    async count(options) {
        return this.terrainRepository.count(options);
    }
}