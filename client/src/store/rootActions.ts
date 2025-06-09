import { apiUtilsActions } from './api/utils'
import { authActions } from './reducers/auth/slice'

export const rootActions = {
	...apiUtilsActions,
	...authActions,
}