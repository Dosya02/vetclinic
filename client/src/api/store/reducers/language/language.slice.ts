import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '@localization/i18n';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: i18n.language || 'ru',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
