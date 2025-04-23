import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models";
import { sendVerificationCode, verifyCode, setPassword, login } from "./auth.actions";

interface AuthState {
	loading: boolean
	userInfo: IUser | null
	userToken: string | null
	error: string | null
	success: boolean
}

const userToken = localStorage.getItem("userToken")
	? localStorage.getItem("userToken")
	: null

const initialState: AuthState = {
	loading: false,
	userInfo: null,
	userToken,
	error: null,
	success: false,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, { payload }: PayloadAction<{ userInfo: IUser }>) => {
			state.userInfo = payload.userInfo;
			state.success = true;
		},
		logout: (state) => {
			state.userInfo = null;
			state.userToken = null;
			state.success = false;
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

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;