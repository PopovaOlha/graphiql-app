'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { Base64, decode } from 'js-base64';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { addToHistory } from '@/services/historyService';
import {
    CustomTabPanelProps,
    KeyValuePair,
    ResponseStatus,
    RestfulPageState,
    Variable,
} from '@/types/interfaces';
import { replaceVariablesInJson, updateQueryParams } from '@/utils/utils';

import { HeadersSection } from './HeadersSection';
import { VariablesSection } from './VariablesSection';

Base64.extendBuiltins();

const CustomTabPanel = ({
    children,
    value,
    index,
    ...other
}: CustomTabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
};

const tabsProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

interface RestFormProps {
    body: string;
    sendAnswer: (data: string) => void;
    sendResponseStatus: (responseStatus: ResponseStatus) => void;
}

const RestForm: FC<RestFormProps> = ({ body, sendAnswer, sendResponseStatus }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();

    const { t } = useTranslation();

    const theme = useTheme();
    const mode = theme.palette.mode;

    const [state, setState] = useState<RestfulPageState>({
        method: params.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: params && params.url ? decode(params.url as string) : '',
    });
    const [jsonBody, setJsonBody] = useState<string | undefined>('');
    const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([
        { key: '', value: '' },
    ]);
    const [variables, setVariables] = useState<Variable[]>([
        { name: '', value: '' },
    ]);

    const [editorLang, setEditorLang] = useState<string>('json');

    const [tabValue, setTabValue] = useState<number>(0);

    useEffect(() => {
        const queries = [];
        for (const [key, value] of searchParams.entries()) {
            const newPair = { key: key, value: value };
            queries.push(newPair);
        }
        setKeyValuePairs([...queries, ...keyValuePairs]);

        if (body.length) {
            const bodyObject = JSON.parse(decode(body));
            const savedBody = bodyObject.jsonBody;
            const savedVariables = bodyObject.variables;

            setJsonBody(savedBody);
            setVariables(savedVariables);
        }
    }, []);

    useEffect(() => {
        const newPath = `/restful/${state.method}/${state.url.toBase64URL()}${jsonBody?.length ? `/${JSON.stringify({ jsonBody, variables }).toBase64URL()}` : ''}?${searchParams.toString()}`;

        window.history.pushState({}, '', newPath);
    }, [state.method, state.url, jsonBody, searchParams, variables]);

    const handleMethodChange = (
        event: SelectChangeEvent<'GET' | 'POST' | 'PUT' | 'DELETE'>
    ) => {
        setState((prevState) => ({
            ...prevState,
            method: event.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE',
        }));
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            url: event.target.value,
        }));
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleKeyChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newKeyValuePairs = [...keyValuePairs];
        newKeyValuePairs[index].key = event.target.value;
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleValueChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newKeyValuePairs = [...keyValuePairs];
        newKeyValuePairs[index].value = event.target.value;
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleAddPair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
    };

    const handleRemovePair = (index: number) => {
        updateQueryParams(searchParams, keyValuePairs, index, pathname);

        const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleNameChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newVariable = [...variables];
        newVariable[index].name = event.target.value;
        setVariables(newVariable);
    };

    const handleVarValueChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newVariable = [...variables];
        newVariable[index].value = event.target.value;
        setVariables(newVariable);
    };

    const handleAddVariable = () => {
        setVariables([...variables, { name: '', value: '' }]);
    };

    const handleRemoveVariable = (index: number) => {
        const newVariable = variables.filter((_, i) => i !== index);
        setVariables(newVariable);
    };

    const handleSubmit = async () => {
        addToHistory({
            method: state.method,
            url: state.url,
            path: window.location.href.replace(window.location.origin, ''),
        });

        const headers: Record<string, string> = {};
        keyValuePairs.forEach((pair) => {
            if (pair.key && pair.value) {
                headers[pair.key] = pair.value;
            }
        });

        let finalJsonBody = jsonBody;
        if (jsonBody && state.method !== 'GET' && state.method !== 'DELETE') {
            try {
                finalJsonBody = replaceVariablesInJson(jsonBody, variables);
                const parsedJsonBody = JSON.parse(finalJsonBody);
                finalJsonBody = JSON.stringify(parsedJsonBody);
            } catch (error) {
                console.error(
                    'Error parsing or replacing variables in JSON Body:',
                    error
                );
                return;
            }
        }

        try {
            const options: Record<string, string | object> = {
                method: state.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (state.method !== 'GET' && state.method !== 'DELETE') {
                options.body = JSON.stringify({
                    url: state.url,
                    headers,
                    body: finalJsonBody,
                });
            }
            const response = await fetch(
                `/api/restful${state.method === 'GET' || state.method === 'DELETE' ? `?url=${state.url}` : ''}`,
                options
            );

            const data = (await response.json()) as Record<string, unknown>;
            sendAnswer(JSON.stringify(data, null, 2));

            sendResponseStatus({
                code: response.status,
                status: response.statusText,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ width: '100%', marginBottom: '2rem' }}
            >
                <Grid item>
                    <FormControl
                        sx={{
                            minWidth: 120,
                            '.MuiInputBase-root': {
                                color: theme.palette.custom[
                                    state.method.toLowerCase()
                                ],
                            },
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor:
                                    theme.palette.custom[state.method.toLowerCase()],
                            },
                        }}
                        variant="outlined"
                        size={'small'}
                    >
                        <InputLabel>{t('restClient:methodLabel')}</InputLabel>
                        <Select
                            value={state.method}
                            onChange={handleMethodChange}
                            label={t('restClient:methodLabel')}
                        >
                            <MenuItem value="GET">GET</MenuItem>
                            <MenuItem value="POST">POST</MenuItem>
                            <MenuItem value="PUT">PUT</MenuItem>
                            <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                    <TextField
                        fullWidth
                        label={t('restClient:urlLabel')}
                        type="url"
                        placeholder={t('restClient:urlPlaceholder')}
                        variant="outlined"
                        value={state.url}
                        onChange={handleUrlChange}
                        onBlur={(e) =>
                            window.history.pushState(
                                {},
                                '',
                                `/restful/${state.method}/${e.target.value.toBase64URL()}?${searchParams.toString()}`
                            )
                        }
                        size={'small'}
                        sx={{
                            '.MuiInputBase-input:-webkit-autofill': {
                                boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            },
                        }}
                    />
                </Grid>

                <Grid item>
                    <Button
                        sx={{
                            height: '40px',
                            backgroundColor:
                                theme.palette.custom[
                                    state.method.toLocaleLowerCase()
                                ],
                            '&:hover': {
                                backgroundColor:
                                    theme.palette.custom[
                                        state.method.toLocaleLowerCase()
                                    ],
                            },
                        }}
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!state.url}
                    >
                        {t('restClient:submitButton')}
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                >
                    <Tab label={t('restClient:tabs.headers')} {...tabsProps(0)} />
                    <Tab label={t('restClient:tabs.jsonBody')} {...tabsProps(1)} />
                    <Tab label={t('restClient:tabs.variables')} {...tabsProps(3)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={tabValue} index={0}>
                <HeadersSection
                    keyValuePairs={keyValuePairs}
                    handleKeyChange={handleKeyChange}
                    handleValueChange={handleValueChange}
                    handleRemovePair={handleRemovePair}
                    handleAddPair={handleAddPair}
                />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
                <FormControl sx={{ minWidth: 120 }} variant="standard">
                    <Select
                        label={t('restClient:jsonBody.languageLabel')}
                        value={editorLang}
                        onChange={(e: SelectChangeEvent<string>) =>
                            setEditorLang(e.target.value)
                        }
                    >
                        <MenuItem value="json">JSON</MenuItem>
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="xml">XML</MenuItem>
                    </Select>
                </FormControl>
                {state.url.length ? (
                    <Editor
                        height="200px"
                        defaultLanguage={editorLang}
                        value={jsonBody}
                        theme={mode === 'light' ? 'light' : 'vs-dark'}
                        options={{
                            minimap: { enabled: false },
                            readOnly: !state.url.length,
                        }}
                        onChange={(value) => setJsonBody(value)}
                    />
                ) : (
                    <Typography variant={'body1'}>
                        {t('restClient:emptyURL')}
                    </Typography>
                )}
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
                <VariablesSection
                    variables={variables}
                    handleAddVariable={handleAddVariable}
                    handleRemoveVariable={handleRemoveVariable}
                    handleVarValueChange={handleVarValueChange}
                    handleNameChange={handleNameChange}
                />
            </CustomTabPanel>
        </>
    );
};

export { RestForm };
