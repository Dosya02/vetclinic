import { Schema, model, Types, Document } from 'mongoose';

export interface IAppointment extends Document {
	fullname?: string;
	petName?: string;
	speciesId?: Types.ObjectId;

	userId?: Types.ObjectId;
	petId?: Types.ObjectId;

	serviceId: Types.ObjectId;
	vetId: Types.ObjectId;
	datetime: Date;
	comment?: string;
	address?: string;
}

const appointmentSchema = new Schema<IAppointment>(
	{
		fullname: { type: String },
		petName: { type: String },
		speciesId: { type: Schema.Types.ObjectId, ref: 'Species' },

		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		petId: { type: Schema.Types.ObjectId, ref: 'Pet' },

		serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
		vetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		datetime: { type: Date, required: true },
		comment: { type: String },
		address: { type: String },
	},
	{ timestamps: true }
);

export const Appointment = model<IAppointment>('Appointment', appointmentSchema);
