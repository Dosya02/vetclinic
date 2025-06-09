import { useCallback, type ChangeEvent } from 'react'
import { useActions, useAppSelector } from '@hooks'

export const useAgree = () => {
	const { changeAuthAgree } = useActions()

	const agree = useAppSelector(state => state.authReducer.agree)

	const onAgreeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		changeAuthAgree(e.target.checked)
	}, [changeAuthAgree])

	return { agree, onAgreeChange }
}