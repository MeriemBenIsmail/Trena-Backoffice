
/* eslint-disable prettier/prettier */
import { Terrain } from "src/terrains/schemas/terrain.schema";

export class CreateReservationDTO {
    user:string;
    terrain: string;
    date: Date;
    heure_debut: string;
    heure_fin: string;

    
}