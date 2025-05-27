import { createSlice } from '@reduxjs/toolkit';
import { PetModel } from '@models';

interface AppointmentState {
  fullName: string;
  pet: PetModel | null;
}

const initialState: AppointmentState = {
  fullName: '',
  pet: null,
};

export const slice = createSlice({
                                   name: 'appointment',
                                   initialState,
                                   reducers: {},
                                 });

export default slice.reducer;