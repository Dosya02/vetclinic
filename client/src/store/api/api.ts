import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '@constants'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(TOKEN_STORAGE_KEY)
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	tagTypes: ['Species', 'Breeds', 'Pets', 'Services'],
	endpoints: () => ({}),
})