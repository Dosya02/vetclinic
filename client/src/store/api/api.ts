import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "../../config";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: apiConfig.baseUrl,
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