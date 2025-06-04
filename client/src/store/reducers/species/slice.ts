import { SpeciesModel } from '@models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

export const slice = createSlice({
	name: 'species',
	initialState,
	reducers: {
		changeName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		clearCurrentSpeciesId: (state) => {
			state.currentId = undefined;
		},
		resetFields: (state) => {
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

export const {
	changeName,
	clearCurrentSpeciesId,
	resetFields,
	setCurrentSpeciesId,
	setSpecies,
} = slice.actions;
export default slice.reducer;