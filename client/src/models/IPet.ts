import { PetTypes } from "../enums";

export interface IPet {
	name: string;
	type: PetTypes;
	imageUrl?: string;
}