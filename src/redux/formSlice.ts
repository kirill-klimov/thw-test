import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormInput } from '../types';

export type FormValues = { [key: string]: string | number; };

interface FormState {
  values: FormValues;
  currentIndex: number;
  currentInput: FormInput | null;
  inputs: FormInput[] | null;
}

const formSlice = createSlice({
  name: 'form',
  initialState: {
    values: {},
    currentIndex: 0,
    inputs: null,
    currentInput: null,
  } as FormState,
  reducers: {
    setInputs: (state, action: PayloadAction<FormInput[] | null>) => {
      state.inputs = action.payload; 
      state.currentIndex = 0;
      if (action.payload) {
        state.currentInput = action.payload[0];
      } else {
        state.currentInput = null;
      }
    },
    setInputValue: (state, action) => {
      state.values[action.payload.name] = action.payload.value;
    },
    nextInput: (state) => {
      const inputs = state.inputs;
      if (!inputs) return;
      if (state.currentIndex < (inputs.length - 1)) {
        const i = state.currentIndex + 1;
        state.currentIndex = i;
        state.currentInput = inputs[i];
      }
    },
    previousInput: (state) => {
      if (state.currentIndex > 0) {
        const i = state.currentIndex - 1;
        state.currentIndex = i;
        state.currentInput = state.inputs ? state.inputs[i] : null;
      }
    },
    clearForm: (state) => {
      state.values = {};
      state.currentIndex = 0;
      state.currentInput = state.inputs ? state.inputs[0] : null;
    },
  }
});

export const FormActions = formSlice.actions;

export const formReducer = formSlice.reducer;