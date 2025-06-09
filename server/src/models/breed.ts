import { Document, model, Schema, Types } from 'mongoose'

export interface IBreed extends Document {
  _id: Types.ObjectId
  name: string
  speciesId: Types.ObjectId
}

const breedSchema = new Schema<IBreed>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    speciesId: {
      type: Schema.Types.ObjectId,
      ref: 'Species',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

breedSchema.index({ name: 1, speciesId: 1 }, { unique: true })

export const Breed = model<IBreed>('Breed', breedSchema)