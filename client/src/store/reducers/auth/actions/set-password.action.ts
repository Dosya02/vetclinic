import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { apiConfig } from "../../../../config";
import { IUser } from "../../../../models";

interface SetPasswordParams {
	email: string;
	password: string;
}

export const setPassword = createAsyncThunk<
	{ token: string; userInfo: IUser },
	SetPasswordParams,
	{ rejectValue: string }
>(
	"auth/registration/set-password",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${apiConfig.registrationUrl}/set-password`,
				{ email, password },
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