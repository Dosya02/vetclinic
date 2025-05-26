import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { IUser } from '@models';
import { API_CONFIG } from '@api/api.config.ts';

interface SetPasswordParams {
  email: string;
  password: string;
}

export const setPassword = createAsyncThunk<
  { token: string; userInfo: IUser },
  SetPasswordParams,
  { rejectValue: string }
>(
  'auth/registration/set-password',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_CONFIG.REGISTRATION_URL}/set-password`,
        { email, password },
      );
      
      localStorage.setItem('userToken', data.token);
      
      return {
        token: data.token,
        userInfo: data.userInfo,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('Unexpected error occurred.');
    }
  },
);