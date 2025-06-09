import { useState, type ChangeEvent } from 'react'

export const useBoolean = (initialValue: boolean = false) => {
	const [value, setValue] = useState<boolean>(initialValue)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.checked)
	}

	const setTrue = () => setValue(true)
	const setFalse = () => setValue(false)
	const toggle = () => setValue((prev) => !prev)

	return { value, onChange, setTrue, setFalse, toggle }
}