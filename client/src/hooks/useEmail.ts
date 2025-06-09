import { useCallback, type ChangeEvent } from 'react'
import { useActions, useAppSelector } from '@hooks'

export const useEmail = () => {
	const { changeAuthEmail } = useActions()

	const email = useAppSelector(state => state.authReducer.email)

	const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		changeAuthEmail(e.target.value)
	}, [changeAuthEmail])

	return { email, onEmailChange }
}