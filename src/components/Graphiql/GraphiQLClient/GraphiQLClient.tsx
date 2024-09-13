'use client';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import {
    Box,
    Button,
    Container,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { GraphQLSchema } from 'graphql';
import { Base64, decode } from 'js-base64';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import DocumentationViewer from '@/components/Graphiql/DocumentationViewer/DocumentationViewer';
import { HeadersSection } from '@/components/Graphiql/HeadersSection/HeadersSection';
import { VariablesSection } from '@/components/Graphiql/VariableSection/VariableSection';
import { ResponseStatusIndicator } from '@/components/RestClient/RestClientComponents';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { addToHistory } from '@/services/historyService';
import { fetchGraphQLSchema } from '@/services/schemaService';
import { GraphQLResponse, KeyValuePair, Variable } from '@/types/interfaces';
import { prettifyQuery } from '@/utils/prettifyQuery';

Base64.extendBuiltins();

const GraphiQLClient: FC<{ body: string }> = ({ body }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();

    const { t } = useTranslation();

    const [endpointUrl, setEndpointUrl] = useState(
        params && params.url ? decode(params.url as string) : ''
    );
    const [sdlUrl, setSdlUrl] = useState('');
    const [query, setQuery] = useState('');
    const [variables, setVariables] = useState<Variable[]>([
        { name: '', value: '' },
    ]);
    const [headers, setHeaders] = useState<KeyValuePair[]>([
        { key: 'Content-Type', value: 'application/json' },
    ]);
    const [response, setResponse] = useState<GraphQLResponse | null>(null);
    const [statusCode, setStatusCode] = useState<number | string>('');
    const [schema, setSchema] = useState<GraphQLSchema | null>(null);

    useEffect(() => {
        if (searchParams.toString().length > 0) {
            const queries = [];
            for (const [key, value] of searchParams.entries()) {
                const newPair = { key: key, value: value };
                queries.push(newPair);
            }
            setHeaders([...queries]);
        } else {
            setHeaders([{ key: 'Content-Type', value: 'application/json' }]);
        }

        if (body.length) {
            const bodyObject = JSON.parse(decode(body));
            const savedQuery = bodyObject.query;
            const savedVariables = bodyObject.variables;

            setQuery(savedQuery);
            setVariables(savedVariables);
        }
    }, []);

    const [tabValue, setTabValue] = useState<number>(0);

    const theme = useTheme();
    const mode = theme.palette.mode;

    useEffect(() => {
        if (endpointUrl) {
            setSdlUrl(`${endpointUrl}?sdl`);
        }
    }, [endpointUrl]);

    useEffect(() => {
        const newPath = `/graphiql/GRAPHQL/${endpointUrl.toBase64URL()}${query?.length ? `/${JSON.stringify({ query, variables }).toBase64URL()}` : ''}?${searchParams.toString()}`;

        window.history.pushState({}, '', newPath);
    }, [endpointUrl, searchParams, query, variables]);

    useEffect(() => {
        window.history.replaceState(null, '', pathname);

        const newQueries = new URLSearchParams();
        headers.forEach((pair) => {
            if (pair.key.length && pair.value.length) {
                newQueries.set(pair.key, pair.value);
            }
        });
        window.history.pushState({}, '', `${pathname}?${newQueries.toString()}`);
    }, [headers, pathname]);

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
        const variablesObject = variables.reduce(
            (acc, { name, value }) => {
                acc[name] = isNaN(Number(value)) ? value : Number(value);
                return acc;
            },
            {} as Record<string, unknown>
        );

        const headersObject = headers.reduce(
            (acc, { key, value }) => {
                acc[key] = value;
                return acc;
            },
            {} as Record<string, string>
        );

        const headersArray: KeyValuePair[] = Object.entries(headersObject).map(
            ([key, value]) => ({ key, value })
        );

        try {
            const result = await executeGraphQLQuery(
                endpointUrl,
                query,
                JSON.stringify(variablesObject),
                headersArray
            );

            setResponse(result);
            setStatusCode(result.statusCode);
            addToHistory({
                method: 'GRAPHQL',
                path: window.location.href.replace(window.location.origin, ''),
                url: endpointUrl,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error executing query:', error.message);
                setResponse(null);
                setStatusCode(500);
            } else {
                console.error('Unknown error:', error);
                setResponse(null);
                setStatusCode(500);
            }
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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleAddVariable = () => {
        setVariables([...variables, { name: '', value: '' }]);
    };

    const handleNameChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedVariables = [...variables];
        updatedVariables[index].name = event.target.value;
        setVariables(updatedVariables);
    };

    const handleVarValueChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedVariables = [...variables];
        updatedVariables[index].value = event.target.value;
        setVariables(updatedVariables);
    };

    const handleRemoveVariable = (index: number) => {
        const updatedVariables = variables.filter((_, i) => i !== index);
        setVariables(updatedVariables);
    };

    const handleKeyChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newHeaders = [...headers];
        newHeaders[index].key = event.target.value;
        setHeaders(newHeaders);
    };

    const handleValueChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newHeaders = [...headers];
        newHeaders[index].value = event.target.value;
        setHeaders(newHeaders);
    };

    const handleAddPair = () => {
        setHeaders([...headers, { key: '', value: '' }]);
    };

    const handleRemovePair = (index: number) => {
        const updatedHeaders = headers.filter((_, i) => i !== index);
        setHeaders(updatedHeaders);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginBottom: '2rem' }}>
                <Typography variant="h1">{t('graphqlClient:title')}</Typography>
                <TextField
                    label={t('graphqlClient:endpointUrl')}
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                    onBlur={(e) =>
                        window.history.pushState(
                            {},
                            '',
                            `/graphiql/GRAPHQL/${e.target.value.toBase64URL()}?${searchParams.toString()}`
                        )
                    }
                />
                <TextField
                    label={t('graphqlClient:sdlUrl')}
                    value={sdlUrl}
                    onChange={(e) => setSdlUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label={t('graphqlClient:query')} />
                        <Tab label={t('graphqlClient:variables')} />
                        <Tab label={t('graphqlClient:headers')} />
                    </Tabs>
                </Box>

                <Box my={2}>
                    {tabValue === 0 &&
                        (endpointUrl.length ? (
                            <Editor
                                height="200px"
                                defaultLanguage="graphql"
                                value={query}
                                theme={mode === 'light' ? 'light' : 'vs-dark'}
                                onChange={(value) => setQuery(value || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                }}
                            />
                        ) : (
                            <Typography variant={'body1'} p={2}>
                                {t('graphqlClient:emptyURL')}
                            </Typography>
                        ))}

                    {tabValue === 1 && (
                        <VariablesSection
                            variables={variables}
                            handleAddVariable={handleAddVariable}
                            handleNameChange={handleNameChange}
                            handleVarValueChange={handleVarValueChange}
                            handleRemoveVariable={handleRemoveVariable}
                        />
                    )}

                    {tabValue === 2 && (
                        <HeadersSection
                            keyValuePairs={headers}
                            handleKeyChange={handleKeyChange}
                            handleValueChange={handleValueChange}
                            handleRemovePair={handleRemovePair}
                            handleAddPair={handleAddPair}
                        />
                    )}
                </Box>

                <Button variant="contained" onClick={handleQueryExecution}>
                    {t('graphqlClient:execute')}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleFetchSchema}
                    style={{ marginLeft: 10 }}
                >
                    {t('graphqlClient:fetchDocs')}
                </Button>

                <Box mt={4}>
                    {response && (
                        <ResponseStatusIndicator
                            responseCode={statusCode}
                            responseStatus={''}
                        />
                    )}
                    <Editor
                        height="50vh"
                        defaultLanguage="javascript"
                        value={
                            response
                                ? JSON.stringify(response, null, 2)
                                : t('graphqlClient:defaultEditorValue')
                        }
                        theme={mode === 'light' ? 'light' : 'vs-dark'}
                        options={{
                            minimap: { enabled: false },
                            readOnly: true,
                        }}
                    />
                </Box>
                {schema && (
                    <Box mt={4}>
                        <Typography variant="h6">
                            {t('graphqlClient:documentation')}
                        </Typography>
                        <DocumentationViewer schema={schema} />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default GraphiQLClient;
