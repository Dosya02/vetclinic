import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreedModel } from '@models';

interface BreedsState {
  breeds: BreedModel[];
  name: string;
  nameErrorMessage: string | null;
  speciesId: string;
  currentId?: string;
}

const initialState: BreedsState = {
  breeds: [],
  name: '',
  nameErrorMessage: null,
  speciesId: '',
  currentId: undefined,
};

const slice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    changeBreedName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeSpeciesId: (state, action: PayloadAction<string>) => {
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
  },
});

export const breedsActions = slice.actions;
export default slice.reducer;