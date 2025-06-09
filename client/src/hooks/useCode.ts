import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from 'react'
import { useActions, useAppSelector } from '@hooks'

export const useCode = () => {
	const { changeAuthCode, setAuthFullCode } = useActions()

	const code = useAppSelector(state => state.authReducer.code)

	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const onCodeChange = (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const value: string = e.target.value

		if (!/^\d?$/.test(value)) {
			return
		}

		changeAuthCode({ index, value })

		if (value && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const onCodeKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			const prev = inputRefs.current[index - 1]
			if (prev) {
				prev.focus()
			}
		}
	}

	const onCodePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const pastedData = e.clipboardData
			.getData('Text')
			.replace(/\D/g, '')
			.slice(0, 6)

		if (!pastedData) {
			return
		}

		const digits = pastedData.split('').slice(0, 6)

		setAuthFullCode(digits)

		e.preventDefault()

		setTimeout(() => {
			for (let i = 0; i < inputRefs.current.length; i++) {
				if (inputRefs.current[i]?.value === '') {
					inputRefs.current[i]?.focus()
					return
				}
			}

			const lastIndex = digits.length - 1

			if (inputRefs.current[lastIndex]) {
				inputRefs.current[lastIndex]?.focus()
			}
		}, 0)
	}

	return {
		code,
		inputRefs,
		onCodeChange,
		onCodeKeyDown,
		onCodePaste,
	}
}