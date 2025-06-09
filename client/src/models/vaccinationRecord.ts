import type { StructuredDateModel } from '@models'

export interface VaccinationRecordModel {
	id: string
	vaccineId: string
	date: StructuredDateModel
	nextDate?: StructuredDateModel
	notes?: string
}