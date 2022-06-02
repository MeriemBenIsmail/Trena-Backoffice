/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, { Document } from "mongoose";
import { Terrain } from "src/terrains/schemas/terrain.schema";

export type ReservationDocument = Reservation & Document;
@Schema()
export class Reservation {
    @Prop()
    id: string;
    @Prop()
    user: string;
    @Prop()
    terrain: string;
    @Prop()
    date: Date;
    @Prop()
    heure_debut: number;
    @Prop()
    heure_fin: number;

}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);