/* eslint-disable prettier/prettier *//* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.sevice';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';



@Module({
  imports: [MongooseModule.forFeature([ {name: Reservation.name, schema: ReservationSchema}])],
  controllers: [ReservationController],
  providers: [ReservationRepository,ReservationService],
})
export class ReservationModule {}