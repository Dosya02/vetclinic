import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { validateAgree, validateCode, validateEmail, validatePassword } from "@utils";

interface AuthState {
	email: string;
	emailErrorMessage: string | null;

	password: string;
	passwordErrorMessage: string | null;

	agree: boolean;
	agreeErrorMessage: string | null;

	code: string[];
	codeErrorMessage: string | null;

	step: 'idle' | 'code' | 'email' | 'password' | 'done';
}

const initialState: AuthState = {
	email: "",
	emailErrorMessage: null,

	password: "",
	passwordErrorMessage: null,

	agree: false,
	agreeErrorMessage: null,

	code: Array(6).fill(""),
	codeErrorMessage: null,

	step: "idle",
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		changeEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
			state.emailErrorMessage = validateEmail(action.payload);
		},
		changePassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
			state.passwordErrorMessage = validatePassword(action.payload);
		},
		changeAgree: (state, action: PayloadAction<boolean>) => {
			state.agree = action.payload;
			state.agreeErrorMessage = validateAgree(action.payload);
		},
		changeCode: (state, action: PayloadAction<{
			index: number;
			value: string;
		}>) => {
			const { index, value } = action.payload;
			if (index >= 0 && index < 6) {
				state.code[index] = value.slice(0, 1);
				state.codeErrorMessage = validateCode(state.code);
			}
		},
		setFullCode: (state, action: PayloadAction<string[]>) => {
			const newCode = action.payload.slice(0, 6).map(char => /^\d$/.test(char) ? char : "");
			state.code = [...Array(6)].map((_, i) => newCode[i] || "");
			state.codeErrorMessage = validateCode(state.code);
		},
		changeStep: (state, action: PayloadAction<typeof state.step>) => {
			state.step = action.payload;
		},
		resetFields: (state) => {
			state.email = "";
			state.emailErrorMessage = null;

			state.password = "";
			state.passwordErrorMessage = null;

			state.agree = false;
			state.agreeErrorMessage = null;

			state.code = Array(6).fill("");
			state.codeErrorMessage = null;
		},
	},
});

export const {
	changeAgree,
	changeCode,
	changeEmail,
	changePassword,
	changeStep,
	setFullCode,
	resetFields,
} = authSlice.actions;
export default authSlice.reducer;