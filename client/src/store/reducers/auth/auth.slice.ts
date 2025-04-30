import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSteps } from "../../../enums";
import { IUser } from "../../../models";
import {
	validateAgree,
	validateCode,
	validateEmail,
	validatePassword,
} from "../../../utils/validators";
import {
	sendVerificationCode,
	verifyCode,
	setPassword,
	login,
} from "./actions";

interface AuthState {
	// --> Fields
	email: string;
	password: string;
	agree: boolean;
	code: string[];
	// --> Error messages
	emailErrorMessage: string;
	passwordErrorMessage: string;
	agreeErrorMessage: string;
	codeErrorMessage: string;
	// --> Statuses
	step: AuthSteps;
	loading: boolean;
	error: string | null;
	success: boolean;
	// --> User
	userInfo: IUser | null
	userToken: string | null
}

const userToken = localStorage.getItem("userToken")
	? localStorage.getItem("userToken")
	: null

const initialState: AuthState = {
	// --> Fields
	email: "",
	password: "",
	agree: false,
	code: Array(6).fill(""),
	// --> Error messages
	emailErrorMessage: "",
	passwordErrorMessage: "",
	agreeErrorMessage: "",
	codeErrorMessage: "",
	// --> Statuses
	step: AuthSteps.SEND_CODE,
	loading: false,
	error: null,
	success: false,
	// --> User
	userInfo: null,
	userToken,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		changeEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			const { isValid, message } = validateEmail(action.payload);
			state.emailErrorMessage = isValid ? "" : message;
		},
		changePassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
			const { isValid, message } = validatePassword(action.payload);
			state.passwordErrorMessage = isValid ? "" : message;
		},
		changeAgree: (state, action: PayloadAction<boolean>) => {
			state.agree = action.payload;
			const { isValid, message } = validateAgree(action.payload);
			state.agreeErrorMessage = isValid ? "" : message;
		},
		changeCode: (state, action: PayloadAction<{
			index: number;
			value: string;
		}>) => {
			const { index, value } = action.payload;
			if (index >= 0 && index < 6) {
				state.code[index] = value.slice(0, 1);
				const { isValid, message } = validateCode(state.code);
				state.codeErrorMessage = isValid ? "" : message;
			}
		},
		changeStep: (state, action: PayloadAction<AuthSteps>) => {
			state.step = action.payload;
		},
		setCredentials: (state, action: PayloadAction<{ userInfo: IUser }>) => {
			state.userInfo = action.payload.userInfo;
			state.success = true;
		},
		logout: (state) => {
			state.userInfo = null;
			state.userToken = null;
			state.success = true;
			localStorage.removeItem("userToken");
		},
	},
	extraReducers: (builder) => {
		builder
			// sendVerificationCode
			.addCase(sendVerificationCode.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(sendVerificationCode.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(sendVerificationCode.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			// verifyCode
			.addCase(verifyCode.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyCode.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(verifyCode.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			// setPassword
			.addCase(setPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(setPassword.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userToken = payload.token;
				state.userInfo = payload.userInfo;
				state.success = true;
			})
			.addCase(setPassword.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			// login
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userToken = payload.token;
				state.userInfo = payload.userInfo;
				state.success = true;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const {
	changeEmail,
	changePassword,
	changeAgree,
	changeCode,
	changeStep,
	setCredentials,
	logout,
} = authSlice.actions;
export default authSlice.reducer;