import { useState, type ChangeEvent } from 'react'

export function useInput(initialValue: string = '') {
	const [value, setValue] = useState<string>(initialValue)

	const onChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => setValue(e.target.value)

	return { value, setValue, onChange }
}