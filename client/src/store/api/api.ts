import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://vetclinic-4dz3.onrender.com"

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("userToken");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});