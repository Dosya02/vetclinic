import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpeciesModel } from '@models';

interface SpeciesState {
  species: SpeciesModel[];
  name: string;
  nameErrorMessage: string | null;
  currentId?: string;
}

const initialState: SpeciesState = {
  species: [],
  name: '',
  nameErrorMessage: null,
  currentId: undefined,
};

const slice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    changeSpeciesName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearCurrentSpeciesId: (state) => {
      state.currentId = undefined;
    },
    resetSpeciesFields: (state) => {
      state.name = '';
      state.nameErrorMessage = null;
      state.currentId = undefined;
    },
    setCurrentSpeciesId: (state, action: PayloadAction<string>) => {
      state.currentId = action.payload;
    },
    setSpecies: (state, action: PayloadAction<SpeciesModel[]>) => {
      state.species = action.payload;
    },
  },
});

export const speciesActions = slice.actions;
export default slice.reducer;