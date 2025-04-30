import { PetTypes } from "../enums";

export interface IPet {
	id: string;
	name: string;
	type: PetTypes;
	imageUrl?: string;
}