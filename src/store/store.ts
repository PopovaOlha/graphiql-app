import { configureStore } from '@reduxjs/toolkit';

import graphiqlReducer from '../store/reducers/graphiqlSlice';

export const store = configureStore({
    reducer: {
        graphiql: graphiqlReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
