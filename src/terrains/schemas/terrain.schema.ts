/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type TerrainDocument = Terrain & Document;
@Schema()
export class Terrain {
    @Prop()
    id: string;
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    type: string;
    @Prop()
    address: string;
    @Prop()
    surface: number;
    @Prop()
    available: boolean;

}
export const TerrainSchema = SchemaFactory.createForClass(Terrain);