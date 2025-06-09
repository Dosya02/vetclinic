export interface VaccineModel {
	id: string
	name: string
	description?: string
	manufacturer?: string
	speciesIds: string[]
}