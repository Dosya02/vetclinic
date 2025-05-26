import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { IUser } from '@models';
import { API_CONFIG } from '@api/api.config.ts';

interface LoginParams {
  email: string;
  password: string;
}

export const login = createAsyncThunk<
  { token: string; userInfo: IUser },
  LoginParams,
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const { data } = await axios.post(
        API_CONFIG,
        { email, password },
        config,
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