import { Document, model, Schema, Types } from 'mongoose'

export interface IService extends Document {
	_id: Types.ObjectId
	name: string
}

const serviceSchema = new Schema<IService>(
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
)

export const Service = model<IService>('Service', serviceSchema)