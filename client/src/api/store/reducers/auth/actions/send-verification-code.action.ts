import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { API_CONFIG } from '@api/api.config.ts';

interface SendVerificationCodeParams {
  email: string;
}

export const sendVerificationCode = createAsyncThunk<
  void,
  SendVerificationCodeParams,
  { rejectValue: string }
>(
  'auth/registration/send-code',
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      await axios.post(
        `${API_CONFIG}/send-code`,
        { email },
        config,
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('Unexpected error occurred.');
    }
  },
);