import { authApi } from './auth'

export const apiUtilsActions = {
	resetAuthApi: () => authApi.util.resetApiState(),
}