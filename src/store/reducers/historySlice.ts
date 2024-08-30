import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addToHistory(state, action: PayloadAction<string>) {
            state.push(action.payload);
        },
        removeFromHistory(state, action: PayloadAction<string>) {
            state = state.filter((item) => item !== action.payload);
        },
    },
});

export const { addToHistory, removeFromHistory } = historySlice.actions;

export default historySlice.reducer;
