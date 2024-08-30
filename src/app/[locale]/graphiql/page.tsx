'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setEndpointUrl,
    setSdlUrl,
    setQuery,
    setVariables,
    addHeader,
    removeHeader,
    setResponse,
    setStatusCode,
} from '@/store/reducers/graphiqlSlice';
import { RootState } from '@/store/store';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Box } from '@mui/material';

const GraphiQLClient = () => {
    const dispatch = useDispatch();
    const { endpointUrl, sdlUrl, query, variables, headers, response, statusCode } =
        useSelector((state: RootState) => state.graphiql);

    const [localEndpointUrl, setLocalEndpointUrl] = useState(endpointUrl);
    const [localSdlUrl, setLocalSdlUrl] = useState(sdlUrl);

    useEffect(() => {
        if (!localSdlUrl) {
            const newSdlUrl = `${localEndpointUrl}?sdl`;
            setLocalSdlUrl(newSdlUrl);
            dispatch(setSdlUrl(newSdlUrl));
        }
    }, [localEndpointUrl, dispatch]);

    const handleEndpointUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setLocalEndpointUrl(newUrl);
        dispatch(setEndpointUrl(newUrl));
    };

    const handleSdlUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSdlUrl = e.target.value;
        setLocalSdlUrl(newSdlUrl);
        dispatch(setSdlUrl(newSdlUrl));
    };

    const handleQueryExecution = async () => {
        try {
            const headersObject = headers.reduce(
                (acc, header) => {
                    acc[header.key] = header.value;
                    return acc;
                },
                {} as Record<string, string>
            );

            const response = await axios.post(
                localEndpointUrl,
                {
                    query,
                    variables: JSON.parse(variables || '{}'),
                },
                { headers: headersObject }
            );

            dispatch(setResponse(response.data));
            dispatch(setStatusCode(response.status));
        } catch (error) {
            const axiosError = error as AxiosError;

            const errorMessage = axiosError.response
                ? axiosError.response.data
                : { message: 'Unknown error occurred' };
            const statusCode = axiosError.response
                ? axiosError.response.status
                : 500;

            dispatch(setResponse(errorMessage));
            dispatch(setStatusCode(statusCode));
        }
    };

    return (
        <Box p={2}>
            <TextField
                label="Endpoint URL"
                value={localEndpointUrl}
                onChange={handleEndpointUrlChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="SDL URL"
                value={localSdlUrl}
                onChange={handleSdlUrlChange}
                fullWidth
                margin="normal"
            />
            <Box my={2}>
                <Button onClick={() => dispatch(addHeader({ key: '', value: '' }))}>
                    Add Header
                </Button>
                {headers.map((header, index) => (
                    <Box key={index} display="flex" gap={1} my={1}>
                        <TextField
                            label="Header Key"
                            value={header.key}
                            onChange={(e) => {
                                const updatedHeaders = [...headers];
                                updatedHeaders[index] = {
                                    ...header,
                                    key: e.target.value,
                                };
                                dispatch(removeHeader(index));
                                dispatch(addHeader(updatedHeaders[index]));
                            }}
                        />
                        <TextField
                            label="Header Value"
                            value={header.value}
                            onChange={(e) => {
                                const updatedHeaders = [...headers];
                                updatedHeaders[index] = {
                                    ...header,
                                    value: e.target.value,
                                };
                                dispatch(removeHeader(index));
                                dispatch(addHeader(updatedHeaders[index]));
                            }}
                        />
                        <Button onClick={() => dispatch(removeHeader(index))}>
                            Remove
                        </Button>
                    </Box>
                ))}
            </Box>
            <TextField
                label="GraphQL Query"
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                fullWidth
                margin="normal"
                multiline
                rows={6}
            />
            <TextField
                label="Variables (JSON format)"
                value={variables}
                onChange={(e) => dispatch(setVariables(e.target.value))}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
            <Button variant="contained" onClick={handleQueryExecution}>
                Execute
            </Button>
            <Box mt={4}>
                <h3>Response</h3>
                <p>Status Code: {statusCode}</p>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </Box>
        </Box>
    );
};

export default GraphiQLClient;
