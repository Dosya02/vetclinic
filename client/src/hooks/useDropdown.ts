import { useCallback, useMemo, useState } from 'react'
import type { DropdownOptionType } from '@constants'

export const useDropdown = (
	initialValue: string = '',
	options: DropdownOptionType[] = [],
) => {
	const [value, setValue] = useState(initialValue)

	const selectedOption = useMemo(
		() => options.find(option => option.id === value),
		[value, options]
	)

	const onChange = useCallback((id: string) => {
		setValue(id)
	}, [])

	const setById = useCallback((id: string) => {
		setValue(id)
	}, [])

	const reset = useCallback(() => {
		setValue(initialValue)
	}, [initialValue])

	return {
		value,
		options,
		selectedOption,
		onChange,
		setById,
		reset,
	}
}
