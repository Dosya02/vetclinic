import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import {
	authReducer,
	languageReducer,
} from "./reducers";

const rootReducer = combineReducers({
	authReducer,
	languageReducer,
	[api.reducerPath]: api.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;