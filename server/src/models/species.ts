import { Document, model, Schema, Types } from 'mongoose';

export interface ISpecies extends Document {
  _id: Types.ObjectId;
  name: string;
}

const speciesSchema = new Schema<ISpecies>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Species = model<ISpecies>('Species', speciesSchema);