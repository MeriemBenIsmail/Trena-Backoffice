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
        return this.terrainRepository.findOne({_id: terrainId })
    }

    async getTerrains(): Promise<Terrain[]> {
        return this.terrainRepository.find({});
    }
    async getTerrainsWithFilters(filterDTO: FilterTerrainDTO): Promise<Terrain[]> {
        let ville = filterDTO.ville;
        let type = filterDTO.type
       
        const surfaceMin = filterDTO.surfaceMin;
        const surfaceMax = filterDTO.surfaceMax;

        const available = filterDTO.available;
       
        // eslint-disable-next-line prefer-const
        let terrains = await this.getTerrains();
        let newTerrains ;
        newTerrains = terrains.filter(terrain => terrain.surface <=surfaceMax && terrain.surface >=surfaceMin );
        //filtering
        let resultTerrain = [];
        if(type) {
            let typeArray = type.split(',')
            //newTerrains = terrains.filter(terrain => terrain.type === type);
            typeArray.forEach((type) => {
                resultTerrain = terrains.filter(terrain => terrain.type === type);  
                newTerrains = newTerrains.concat(resultTerrain);
                
            })
            console.log(newTerrains)
           // newTerrains = terrains.filter(terrain => typeArray.indexOf(terrain.type) !==-1);
        
        }
        if(ville) {
            ville = ville.toLowerCase()
            newTerrains = terrains.filter(terrain => 
                terrain.address.toLowerCase().includes(ville) 
                );
                console.log(newTerrains)
        }
        if(available && available.toString() === "true") {
            
                newTerrains = terrains.filter(terrain => terrain.available == true);
        }
        else if(available && available.toString() === "false") {
    
                newTerrains = terrains.filter(terrain => terrain.available == false);
        }
        
           
        
        return newTerrains;
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