'use client';

import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { GraphQLSchema } from 'graphql';
import prettier from 'prettier';
import parserGraphql from 'prettier/parser-graphql';

import DocumentationViewer from '@/components/Graphiql/DocumentationViewer/DocumentationViewer';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { fetchGraphQLSchema } from '@/services/schemaService';
import { GraphQLResponse } from '@/types/interfaces';

const GraphiQLClient: FC = () => {
    const [endpointUrl, setEndpointUrl] = useState('');
    const [sdlUrl, setSdlUrl] = useState('');
    const [query, setQuery] = useState('');

    const [variables, setVariables] = useState('');
    const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
    const [response, setResponse] = useState<GraphQLResponse>();
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);

    useEffect(() => {
        setSdlUrl(`${endpointUrl}?sdl`);
    }, [endpointUrl]);

    const handlePrettifyQuery = async () => {
        try {
            const prettifiedQuery = prettier.format(query, {
                parser: 'graphql',
                plugins: [parserGraphql],
            });
            setQuery(await prettifiedQuery);
        } catch (error) {
            console.error('Error prettifying query:', error);
        }
    };

    const handleQueryExecution = async () => {
        const result = await executeGraphQLQuery(
            endpointUrl,
            query,
            variables,
            headers
        );

        setResponse(result);
        setStatusCode(result.statusCode);

        const encodedUrl =
            `GRAPHQL/${btoa(endpointUrl)}/${btoa(query)}?` +
            headers.map((header) => `${header.key}=${header.value}`).join('&');
        window.history.pushState(null, '', encodedUrl);
    };

    const handleFetchSchema = async () => {
        const headersObject = headers.reduce(
            (acc, header) => {
                acc[header.key] = header.value;
                return acc;
            },
            {} as Record<string, string>
        );

        const fetchedSchema = await fetchGraphQLSchema(sdlUrl, headersObject);
        if (fetchedSchema) {
            setSchema(fetchedSchema);
        }
    };

    return (
        <Box p={2}>
            <TextField
                label="Endpoint URL"
                value={endpointUrl}
                onChange={(e) => setEndpointUrl(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="SDL URL"
                value={sdlUrl}
                onChange={(e) => setSdlUrl(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Box my={2}>
                <Button
                    onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                >
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
                                setHeaders(updatedHeaders);
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
                                setHeaders(updatedHeaders);
                            }}
                        />
                        <Button
                            onClick={() => {
                                const updatedHeaders = headers.filter(
                                    (_, i) => i !== index
                                );
                                setHeaders(updatedHeaders);
                            }}
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
            </Box>
            <TextField
                label="GraphQL Query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={6}
            />
            <TextField
                label="Variables (JSON format)"
                value={variables}
                onChange={(e) => setVariables(e.target.value)}
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
                onClick={handlePrettifyQuery}
                style={{ marginLeft: 10 }}
            >
                Prettify Query
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
