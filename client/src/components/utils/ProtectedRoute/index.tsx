import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES, type UserRole } from '@constants'
import { useAppSelector } from '@hooks'

interface Props {
	allowedRoles: UserRole[]
}

export const ProtectedRoute: FC<Props> = ({ allowedRoles }) => {
	const { userInfo } = useAppSelector((state) => state.authReducer)

	if (!userInfo) {
		return <Navigate to={ROUTES.LOGIN} replace />
	}

	if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
		return <Navigate to={ROUTES.UNAUTHORIZED} replace />
	}

	return <Outlet />
}