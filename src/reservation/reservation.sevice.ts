/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from "@nestjs/common";
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
        const date = filterDTO.date;

        let reservations = await this.getReservations();
    
        if(terrainID){
            reservations = reservations.filter(reservation => reservation.terrain === terrainID);
            }
        if(userMail){
            reservations = reservations.filter(reservation => reservation.user === userMail);
            
        }
        if(date) {
            console.log(date)
           //reservations.map((res) => console.log(res.date.toISOString().split('T')[0] === date))
            reservations = reservations.filter(reservation =>
                
                (reservation.date.toISOString().split('T')[0]) === date);
                
                //console.log(reservations)
        }
        
        return reservations;
    }
   
    
    async createReservation(CreateReservationDTO: CreateReservationDTO): Promise<Reservation> {

        const terrain = CreateReservationDTO.terrain;
        const user = CreateReservationDTO.user;
        const date = (CreateReservationDTO.date);
        const heure_debut = CreateReservationDTO.heure_debut;
        const heure_fin = CreateReservationDTO.heure_fin;
    
        let resultRes = await this.getReservationWithFilters(
            {user:user,terrain: terrain,date: date.toString()}
        )
        resultRes = resultRes.filter(reservation =>
            reservation.heure_debut <= heure_debut && reservation.heure_fin >= heure_debut && reservation.heure_debut <= heure_fin && reservation.heure_fin >= heure_fin
        )
        console.log(resultRes)
        if(resultRes) {
            console.log('im here')
            return null;
        } else 
       { return this.reservationRepository.create({
            id: uuidv4(),
            ...CreateReservationDTO
        })
    }

}