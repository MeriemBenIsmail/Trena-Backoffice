/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateTerrainDTO } from "./dtos/update-terrain.dto";
import { CreateTerrainDTO } from "./dtos/create-terrain.dto";
import { Terrain } from "./schemas/terrain.schema";
import { TerrainRepository } from "./terrain.repository";

@Injectable()
export class TerrainService {
    constructor(private readonly terrainRepository: TerrainRepository) {}

    async getTerrainById(terrainId: string): Promise<Terrain> {
        return this.terrainRepository.findOne({ terrainId })
    }

    async getTerrains(): Promise<Terrain[]> {
        return this.terrainRepository.find({});
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
}