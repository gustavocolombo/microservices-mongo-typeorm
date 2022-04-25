import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Products extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
