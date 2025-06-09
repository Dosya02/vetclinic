import { useCallback, type ChangeEvent } from 'react'
import { useActions, useAppSelector } from '@hooks'

export const usePassword = () => {
	const { changeAuthPassword } = useActions()

	const password = useAppSelector(state => state.authReducer.password)

	const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		changeAuthPassword(e.target.value)
	}, [changeAuthPassword])

	return { password, onPasswordChange }
}