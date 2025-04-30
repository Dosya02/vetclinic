import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { apiConfig } from "../../../../config";

interface SendVerificationCodeParams {
	email: string;
}

export const sendVerificationCode = createAsyncThunk<
	void,
	SendVerificationCodeParams,
	{ rejectValue: string }
>(
	"auth/registration/send-code",
	async ({ email }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			}

			await axios.post(
				`${apiConfig.registrationUrl}/send-code`,
				{ email },
				config,
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || error.message);
			}
			return rejectWithValue("Unexpected error occurred.");
		}
	},
);