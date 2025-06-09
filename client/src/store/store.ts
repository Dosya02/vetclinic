import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { default as authReducer } from './reducers/auth/slice'

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	authReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch