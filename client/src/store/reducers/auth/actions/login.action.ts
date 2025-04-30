import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { apiConfig } from "../../../../config";
import { IUser } from "../../../../models";

interface LoginParams {
	email: string;
	password: string;
}

export const login = createAsyncThunk<
	{ token: string; userInfo: IUser },
	LoginParams,
	{ rejectValue: string }
>(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				apiConfig.loginUrl,
				{ email, password },
				config,
			);

			localStorage.setItem("userToken", data.token);

			return {
				token: data.token,
				userInfo: data.userInfo,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || error.message);
			}
			return rejectWithValue("Unexpected error occurred.");
		}
	}
);