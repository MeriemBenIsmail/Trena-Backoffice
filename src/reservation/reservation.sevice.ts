/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { CreateReservationDTO } from "./dtos/CreateReservation.dto";
import { FilterReservationDTO } from "./dtos/filterReservation.dto";
import { Reservation } from "./schemas/reservation.schema";
import { ReservationRepository } from "./reservation.repository";
@Injectable()
export class ReservationService {
    constructor(private readonly reservationRepository: ReservationRepository) {}

    async getReservations(): Promise<Reservation[]> {
        
        return this.reservationRepository.findAll()
    }
    
    async getReservationWithFilters(filterDTO :FilterReservationDTO): Promise<Reservation[]> {
        const terrainID= filterDTO.terrain;
        const userMail= filterDTO.user;
        console.log(userMail)
        let reservations = await this.getReservations();
        console.log(reservations[0].terrain)
        let newReservations ;
        if(terrainID){
            reservations = reservations.filter(reservation => reservation.terrain === terrainID);
            }
        if(userMail){
            reservations = reservations.filter(reservation => reservation.user === userMail);
           
        }
        
        return reservations;
    }
   
    async createReservation(CreateReservationDTO: CreateReservationDTO): Promise<Reservation> {

        return this.reservationRepository.create({
            id: uuidv4(),
            ...CreateReservationDTO
        })
    }

}