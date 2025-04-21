import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
	step: "email" | "code" | "password"
	email: string
	agree: boolean
	code: string[]
	password: string
	message: string
}

const initialState: RegistrationState = {
	step: "email",
	email: "",
	agree: false,
	code: new Array(6).fill(""),
	password: "",
	message: "",
}

export const registrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		setStep(state, action: PayloadAction<"email" | "code" | "password">) {
			state.step = action.payload;
		},
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		setAgree(state, action: PayloadAction<boolean>) {
			state.agree = action.payload;
		},
		setCode(state, action: PayloadAction<{ index: number; value: string }>) {
			const { index, value } = action.payload;
			if (index >= 0 && index < 6) {
				state.code[index] = value;
			}
		},
		setPassword(state, action: PayloadAction<string>) {
			state.password = action.payload;
		},
		setMessage(state, action: PayloadAction<string>) {
			state.message = action.payload;
		},
	}
});

export const {
	setStep,
	setEmail,
	setAgree,
	setCode,
	setPassword,
	setMessage,
} = registrationSlice.actions;

export default registrationSlice.reducer;