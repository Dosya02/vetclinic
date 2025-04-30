import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { pageConfig } from "../../../config";

export const ProtectedRoute: FC = () => {
	const { userInfo } = useAppSelector(state => state.authReducer);

	if (!userInfo) {
		return <Navigate to={pageConfig.home} replace />
	}

	return <Outlet />
}