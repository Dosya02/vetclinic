import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { API_CONFIG } from '@api/api.config';

interface VerifyCodeParams {
  email: string;
  verificationCode: string;
}

export const verifyCode = createAsyncThunk<
  void,
  VerifyCodeParams,
  { rejectValue: string }
>(
  'auth/registration/verify-code',
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      await axios.post(
        `${API_CONFIG.REGISTRATION_URL}/verify-code`,
        { email, verificationCode },
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