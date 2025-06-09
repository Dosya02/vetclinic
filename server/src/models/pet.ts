import { Schema, model, Types, Document } from 'mongoose'
import { Gender, GENDERS } from 'constants/genders'

export interface IPet extends Document {
	_id: Types.ObjectId
	name: string
	speciesId: Types.ObjectId
	breedId: Types.ObjectId
	ownerId: Types.ObjectId
	birthdate: Date
	gender: Gender
	features?: string[]
	imageUrl?: string
	imagePublicId?: string
	createdAt: Date
	updatedAt: Date
}

const petSchema = new Schema<IPet>(
	{
		name: { type: String, required: true },
		speciesId: { type: Schema.Types.ObjectId, ref: 'Species', required: true },
		breedId: { type: Schema.Types.ObjectId, ref: 'Breed', required: true },
		ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		birthdate: { type: Date, required: true },
		gender: {
			type: String,
			enum: Object.values(GENDERS),
			required: true,
		},
		features: [{ type: String }],
		imageUrl: { type: String },
		imagePublicId: { type: String },
	},
	{
		timestamps: true,
	},
)

export const Pet = model<IPet>('Pet', petSchema)
