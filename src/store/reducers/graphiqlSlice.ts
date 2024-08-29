import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GraphiQLState, GraphQLResponse, Header } from '@/types/interfaces';

const initialState: GraphiQLState = {
    endpointUrl: '',
    sdlUrl: '',
    query: '',
    variables: '',
    headers: [],
    response: null,
    statusCode: 0,
};

const graphiqlSlice = createSlice({
    name: 'graphiql',
    initialState,
    reducers: {
        setEndpointUrl(state, action: PayloadAction<string>) {
            state.endpointUrl = action.payload;
        },
        setSdlUrl(state, action: PayloadAction<string>) {
            state.sdlUrl = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setVariables(state, action: PayloadAction<string>) {
            state.variables = action.payload;
        },
        addHeader(state, action: PayloadAction<Header>) {
            state.headers.push(action.payload);
        },
        removeHeader(state, action: PayloadAction<number>) {
            state.headers.splice(action.payload, 1);
        },
        setResponse(state, action: PayloadAction<GraphQLResponse | null>) {
            state.response = action.payload;
        },
        setStatusCode(state, action: PayloadAction<number>) {
            state.statusCode = action.payload;
        },
    },
});

export const {
    setEndpointUrl,
    setSdlUrl,
    setQuery,
    setVariables,
    addHeader,
    removeHeader,
    setResponse,
    setStatusCode,
} = graphiqlSlice.actions;

export default graphiqlSlice.reducer;
