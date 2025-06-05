import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreedModel } from '@models';

interface BreedsState {
  breeds: BreedModel[];
  name: string;
  nameErrorMessage: string | null;
  speciesId: string;
  currentId?: string;
  isLoading: boolean;
  loadedOnce: boolean;
}

const initialState: BreedsState = {
  breeds: [],
  name: '',
  nameErrorMessage: null,
  speciesId: '',
  currentId: undefined,
  isLoading: false,
  loadedOnce: false,
};

const slice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    changeBreedName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeBreedSpeciesId: (state, action: PayloadAction<string>) => {
      state.speciesId = action.payload;
    },
    clearCurrentBreedId: (state) => {
      state.currentId = undefined;
    },
    resetBreedsFields: (state) => {
      state.name = '';
      state.nameErrorMessage = null;
      state.speciesId = '';
      state.currentId = undefined;
    },
    setCurrentBreedId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
    setBreeds: (state, action: PayloadAction<BreedModel[]>) => {
      state.breeds = action.payload;
    },
    setBreedsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBreedsLoadedOnce: (state, action: PayloadAction<boolean>) => {
      state.loadedOnce = action.payload;
    },
  },
});

export const breedsActions = slice.actions;
export default slice.reducer;