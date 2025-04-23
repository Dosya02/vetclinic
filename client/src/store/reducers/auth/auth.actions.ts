import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConfig } from "../../../config";
import { IUser } from "../../../models";

interface SendVerificationCodeParams {
	email: string
}

interface VerifyCodeParams {
	email: string
	verificationCode: string
}

interface SetPasswordParams {
	email: string;
	password: string;
}

interface LoginParams {
	email: string;
	password: string;
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
				`${apiConfig.baseUrl}/auth/registration/send-code`,
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

export const verifyCode = createAsyncThunk<
	void,
	VerifyCodeParams,
	{ rejectValue: string }
>(
	"auth/registration/verify-code",
	async ({ email, verificationCode }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			await axios.post(
				`${apiConfig.baseUrl}/auth/registration/verify-code`,
				{ email, verificationCode },
				config,
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || error.message);
			}
			return rejectWithValue("Unexpected error occurred.");
		}
	}
);

export const setPassword = createAsyncThunk<
	{ token: string; userInfo: IUser },
	SetPasswordParams,
	{ rejectValue: string }
>(
	"auth/registration/set-password",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${apiConfig.baseUrl}/auth/registration/set-password`,
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
				`${apiConfig.baseUrl}/auth/login`,
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