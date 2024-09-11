'use client';

import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { GraphQLSchema } from 'graphql';

import DocumentationViewer from '@/components/Graphiql/DocumentationViewer/DocumentationViewer';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { addToHistory } from '@/services/historyService';
import { fetchGraphQLSchema } from '@/services/schemaService';
import { GraphQLResponse } from '@/types/interfaces';
import { prettifyQuery } from '@/utils/prettifyQuery';

interface Variable {
    name: string;
    value: string;
}

export const replaceVariablesInQuery = (query: string, vars: Variable[]): string => {
    vars.forEach((variable) => {
        const regex = new RegExp(`\\$${variable.name}`, 'g');
        query = query.replace(regex, `"${variable.value}"`);
    });
    return query;
};

const GraphiQLClient: FC = () => {
    const [endpointUrl, setEndpointUrl] = useState('');
    const [sdlUrl, setSdlUrl] = useState('');
    const [query, setQuery] = useState('');
    const [variables, setVariables] = useState<Variable[]>([]);
    const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
        { key: 'Content-Type', value: 'application/json' },
    ]);
    const [response, setResponse] = useState<GraphQLResponse>();
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);

    useEffect(() => {
        if (endpointUrl) {
            setSdlUrl(`${endpointUrl}?sdl`);
        }
    }, [endpointUrl]);

    useEffect(() => {
        const prettifyCurrentQuery = async () => {
            if (query) {
                const prettifiedQuery = await prettifyQuery(query);
                setQuery(prettifiedQuery);
            }
        };
        prettifyCurrentQuery();
    }, [query]);

    const handleQueryExecution = async () => {
        let finalQuery = query;
        try {
            finalQuery = replaceVariablesInQuery(query, variables);
            const variablesString = JSON.stringify(variables);

            const result = await executeGraphQLQuery(
                endpointUrl,
                finalQuery,
                variablesString,
                headers
            );
            setResponse(result);
            setStatusCode(result.statusCode);
            addToHistory({
                endpointUrl,
                query: finalQuery,
                variables: JSON.stringify(variables),
                headers: JSON.stringify(headers),
            });
        } catch (error) {
            console.error('Error executing GraphQL query:', error);
        }
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

    const handleVariableChange = (
        index: number,
        field: 'name' | 'value',
        value: string
    ) => {
        const updatedVariables = [...variables];
        updatedVariables[index] = {
            ...updatedVariables[index],
            [field]: value,
        };
        setVariables(updatedVariables);
    };

    return (
        <div>
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
                    fullWidth
                    margin="normal"
                    disabled
                />
                <Box my={2}>
                    <Button
                        onClick={() =>
                            setHeaders([...headers, { key: '', value: '' }])
                        }
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
                {variables.map((variable, index) => (
                    <Box key={index} display="flex" gap={2} my={1}>
                        <TextField
                            label="Variable Name"
                            value={variable.name}
                            onChange={(e) =>
                                handleVariableChange(index, 'name', e.target.value)
                            }
                        />
                        <TextField
                            label="Variable Value"
                            value={variable.value}
                            onChange={(e) =>
                                handleVariableChange(index, 'value', e.target.value)
                            }
                        />
                        <Button
                            onClick={() =>
                                setVariables(variables.filter((_, i) => i !== index))
                            }
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    onClick={() =>
                        setVariables([...variables, { name: '', value: '' }])
                    }
                >
                    Add Variable
                </Button>
                <Button variant="contained" onClick={handleQueryExecution}>
                    Execute Query
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
        </div>
    );
};

export default GraphiQLClient;
