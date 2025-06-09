import type { GenderType } from '@constants'
import type {
	StructuredDateModel,
	VaccinationRecordModel,
	VisitModel,
} from '@models'

export interface PetModel {
	id: string
	name: string
	speciesId: string
	breedId: string
	ownerId: string
	birthDate: StructuredDateModel
	gender: GenderType
	features?: string[]
	imageUrl?: string
	vaccinations?: VaccinationRecordModel[]
	visits?: VisitModel[]
}