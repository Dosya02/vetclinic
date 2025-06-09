import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from '@hooks'
import { rootActions } from '@store/rootActions'

export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}