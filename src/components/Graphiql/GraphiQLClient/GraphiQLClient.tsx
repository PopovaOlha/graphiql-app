'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import { GraphQLSchema } from 'graphql';

import DocumentationViewer from '@/components/Graphiql/DocumentationViewer/DocumentationViewer';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { fetchGraphQLSchema } from '@/services/schemaService';
import {
    addHeader,
    removeHeader,
    setEndpointUrl,
    setQuery,
    setResponse,
    setSdlUrl,
    setStatusCode,
    setVariables,
} from '@/store/reducers/graphiqlSlice';
import { RootState } from '@/store/store';

const GraphiQLClient = () => {
    const dispatch = useDispatch();
    const { endpointUrl, sdlUrl, query, variables, headers, response, statusCode } =
        useSelector((state: RootState) => state.graphiql);

    const [localEndpointUrl, setLocalEndpointUrl] = useState(endpointUrl);
    const [localSdlUrl, setLocalSdlUrl] = useState(sdlUrl);
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);

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
        const result = await executeGraphQLQuery(
            localEndpointUrl,
            query,
            variables,
            headers
        );
        dispatch(setResponse(result));
        dispatch(setStatusCode(result.statusCode));
    };

    const handleFetchSchema = async () => {
        const headersObject = headers.reduce(
            (acc, header) => {
                acc[header.key] = header.value;
                return acc;
            },
            {} as Record<string, string>
        );

        const fetchedSchema = await fetchGraphQLSchema(localSdlUrl, headersObject);
        if (fetchedSchema) {
            setSchema(fetchedSchema);
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
            <Button
                variant="outlined"
                onClick={handleFetchSchema}
                style={{ marginLeft: 10 }}
            >
                Fetch Documentation
            </Button>
            <Box mt={4}>
                <h3>Response</h3>
                <p>Status Code: {statusCode}</p>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </Box>
            {schema && <DocumentationViewer schema={schema} />}
        </Box>
    );
};

export default GraphiQLClient;
