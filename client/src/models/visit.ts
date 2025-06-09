import type { StructuredDateModel } from '@models'

export interface VisitModel {
	date: StructuredDateModel
	reason: string
	comment?: string
}