import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_STEP, AuthStepType, TOKEN_STORAGE_KEY } from '@constants';
import { AnyUser } from '@models';
import {
  validateAgree,
  validateCode,
  validateEmail,
  validatePassword,
} from '@validators';

interface AuthState {
  email: string;
  emailErrorMessage: string | null;
  password: string;
  passwordErrorMessage: string | null;
  agree: boolean;
  agreeErrorMessage: string | null;
  code: string[];
  codeErrorMessage: string | null;
  step: AuthStepType;
  userInfo: AnyUser | null;
  userToken: string | null;
}

const userToken = localStorage.getItem(TOKEN_STORAGE_KEY) ?? null;

const initialState: AuthState = {
  email: '',
  emailErrorMessage: null,
  password: '',
  passwordErrorMessage: null,
  agree: false,
  agreeErrorMessage: null,
  code: Array(6).fill(''),
  codeErrorMessage: null,
  step: AUTH_STEP.IDLE,
  userInfo: null,
  userToken,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeEmail: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.email = action.payload;
      state.emailErrorMessage = validateEmail(
        action.payload);
    },
    changePassword: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.password = action.payload;
      state.passwordErrorMessage
        = validatePassword(action.payload);
    },
    changeAgree: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.agree = action.payload;
      state.agreeErrorMessage = validateAgree(
        action.payload);
    },
    changeCode: (state, action: PayloadAction<{
      index: number;
      value: string;
    }>) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < 6) {
        state.code[index] = value.slice(0, 1);
        state.codeErrorMessage = validateCode(
          state.code);
      }
    },
    setFullCode: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      const newCode = action.payload.slice(
        0,
        6,
      ).map(char => /^\d$/.test(char)
                    ? char
                    : '');
      state.code = [...Array(6)].map((
        _,
        i,
      ) => newCode[i] ||
           '');
      state.codeErrorMessage = validateCode(
        state.code);
    },
    changeStep: (
      state,
      action: PayloadAction<AuthStepType>,
    ) => {
      state.step = action.payload;
    },
    resetFields: (state) => {
      state.email = '';
      state.emailErrorMessage = null;

      state.password = '';
      state.passwordErrorMessage = null;

      state.agree = false;
      state.agreeErrorMessage = null;

      state.code = Array(6).fill('');
      state.codeErrorMessage = null;

      state.step = AUTH_STEP.IDLE;
    },
    setUser: (
      state,
      action: PayloadAction<AnyUser>,
    ) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
      if (action.payload) {
        localStorage.setItem(TOKEN_STORAGE_KEY, action.payload);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
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
  setUser,
  setToken,
  logout,
} = slice.actions;
export default slice.reducer;