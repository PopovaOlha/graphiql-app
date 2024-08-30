'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setQuery,
    setVariables,
    addHeader,
    removeHeader,
    setResponse,
    setStatusCode,
    setEndpointUrl,
    setSdlUrl,
} from '@/store/reducers/graphiqlSlice';
import { RootState } from '@/store/store';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { TextField, Button, Box } from '@mui/material';
import React from 'react';

const GraphiQLClient = () => {
    const dispatch = useDispatch();
    const { endpointUrl, sdlUrl, query, variables, headers, response, statusCode } =
        useSelector((state: RootState) => state.graphiql);

    const [localEndpointUrl, setLocalEndpointUrl] = useState(endpointUrl);
    const [localSdlUrl, setLocalSdlUrl] = useState(sdlUrl);

    useEffect(() => {
        // Если SDL URL пустой, заполняем его значением с добавленным "?sdl"
        if (!localSdlUrl) {
            const sdl = `${localEndpointUrl}?sdl`;
            setLocalSdlUrl(sdl);
            dispatch(setSdlUrl(sdl));
        } else {
            dispatch(setSdlUrl(localSdlUrl));
        }
    }, [localEndpointUrl, localSdlUrl, dispatch]);

    const handleQueryExecution = async () => {
        const result = await executeGraphQLQuery(
            localEndpointUrl,
            query,
            variables,
            headers
        );
        dispatch(setResponse(result.response));
        dispatch(setStatusCode(result.statusCode));
    };

    return (
        <Box p={2}>
            <TextField
                label="Endpoint URL"
                value={localEndpointUrl}
                onChange={(e) => {
                    const value = e.target.value;
                    setLocalEndpointUrl(value);
                    dispatch(setEndpointUrl(value));
                }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="SDL URL"
                value={localSdlUrl}
                onChange={(e) => setLocalSdlUrl(e.target.value)}
                fullWidth
                margin="normal"
            />
            {/* Реализация редактора заголовков */}
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
            {/* Реализация редактора запросов */}
            <TextField
                label="GraphQL Query"
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                fullWidth
                margin="normal"
                multiline
                rows={6}
            />
            {/* Редактор переменных */}
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
            {/* Секция ответа */}
            <Box mt={4}>
                <h3>Response</h3>
                <p>Status Code: {statusCode}</p>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </Box>
        </Box>
    );
};

export default GraphiQLClient;
