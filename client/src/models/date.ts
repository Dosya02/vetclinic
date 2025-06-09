export interface StructuredDateModel {
	day: number
	month: number
	year: number
}

export interface StructuredDateTimeModel extends StructuredDateModel {
	hour: number
	minute: number
	second: number
}