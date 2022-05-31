/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post,Query } from '@nestjs/common';
import { CreateReservationDTO} from './dtos/CreateReservation.dto';
import {FilterReservationDTO } from './dtos/filterReservation.dto'
import { Reservation } from './schemas/reservation.schema';
import { ReservationService } from './reservation.sevice';
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

    @Get()
    async getReservations(@Query() filterDTO: FilterReservationDTO):Promise<Reservation[]>{
        if(Object.keys(filterDTO).length){
            return this.reservationService.getReservationWithFilters(filterDTO);
          } else {
            return this.reservationService.getReservations();
          }
    }
  @Post()
  async createReservation(@Body() createReservation: CreateReservationDTO): Promise<Reservation> {
      return this.reservationService.createReservation(createReservation)
  }

}