/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reservation, ReservationDocument } from "./schemas/reservation.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ReservationRepository {
    constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>){}
    async findAll(): Promise<Reservation[]> {
        return this.reservationModel.find();
    }
  /*  async find(reservationFilterQuery: FilterQuery<Reservation>): Promise<Reservation> {
        return this.reservationModel.f(reservationFilterQuery);
    }*/

    async create(reservation: Reservation): Promise<Reservation> {
        const newRes = new this.reservationModel(reservation);
        return newRes.save()
    }


    async count(options) {
        return this.reservationModel.count(options).exec();
    }
}