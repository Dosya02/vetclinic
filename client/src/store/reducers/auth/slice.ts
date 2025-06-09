import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STEPS, type StepType, TOKEN_STORAGE_KEY } from '@constants'
import type { AnyUser } from '@models'

interface AuthState {
	email: string
	password: string
	agree: boolean
	code: string[]
	step: StepType
	userInfo: AnyUser | null
	userToken: string | null
}

const userToken = localStorage.getItem(TOKEN_STORAGE_KEY) ?? null

const initialState: AuthState = {
	email: '',
	password: '',
	agree: false,
	code: Array(6).fill(''),
	step: STEPS.IDLE,
	userInfo: null,
	userToken,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		changeAuthAgree: (
			state,
			action: PayloadAction<boolean>,
		) => {
			state.agree = action.payload
		},
		changeAuthCode: (state, action: PayloadAction<{
			index: number
			value: string
		}>) => {
			const { index, value } = action.payload
			if (index >= 0 && index < 6) {
				state.code[index] = value.slice(0, 1)
			}
		},
		changeAuthEmail: (
			state,
			action: PayloadAction<string>,
		) => {
			state.email = action.payload
		},
		changeAuthPassword: (
			state,
			action: PayloadAction<string>,
		) => {
			state.password = action.payload
		},
		changeAuthStep: (
			state,
			action: PayloadAction<StepType>,
		) => {
			state.step = action.payload
		},
		logout: (state) => {
			state.userInfo = null
			state.userToken = null
			localStorage.removeItem(TOKEN_STORAGE_KEY)
		},
		resetAuthFields: (state) => {
			state.email = ''
			state.password = ''
			state.agree = false
			state.code = Array(6).fill('')
			state.step = STEPS.IDLE
		},
		setAuthFullCode: (
			state,
			action: PayloadAction<string[]>,
		) => {
			const newCode = action.payload.slice(
				0,
				6,
			).map(char => /^\d$/.test(char)
				? char
				: '')
			state.code = [...Array(6)].map((
				_,
				i,
			) => newCode[i] ||
				'')
		},
		setAuthToken: (state, action: PayloadAction<string | null>) => {
			state.userToken = action.payload
			if (action.payload) {
				localStorage.setItem(TOKEN_STORAGE_KEY, action.payload)
			} else {
				localStorage.removeItem(TOKEN_STORAGE_KEY)
			}
		},
		setAuthUser: (
			state,
			action: PayloadAction<AnyUser>,
		) => {
			state.userInfo = action.payload
		},
	},
})

export const authActions = slice.actions
export default slice.reducer