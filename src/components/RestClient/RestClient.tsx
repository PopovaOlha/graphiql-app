'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
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

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';
import { addToHistory } from '@/services/historyService';
import {
    CustomTabPanelProps,
    KeyValuePair,
    RestfulPageState,
    Variable,
} from '@/types/interfaces';
import { replaceVariablesInJson } from '@/utils/utils';

import { ResponseStatusIndicator, VariablesSection } from './RestClientComponents';

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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const tabsProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const RestClient = ({ body }: { body: string }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();

    useEffect(() => {
        const queries = [];
        for (const [key, value] of searchParams.entries()) {
            const newPair = { key: key, value: value };
            queries.push(newPair);
        }
        setKeyValuePairs([...queries, ...keyValuePairs]);
    }, []);

    useUnauthorizedRedirect();
    const { t } = useTranslation();

    const [state, setState] = useState<RestfulPageState>({
        method: params.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: params && params.url ? decode(params.url as string) : '',
    });

    const [code, setCode] = useState<string>(
        t('restClient:response.defaultEditorValue')
    );
    const [responseCode, setResponseCode] = useState<number | null>(null);
    const [responseStatus, setResponseStatus] = useState<string>('');
    const [editorLang, setEditorLang] = useState<string>('json');

    const [tabValue, setTabValue] = useState<number>(0);
    const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([
        { key: '', value: '' },
    ]);
    const [variables, setVariables] = useState<Variable[]>([
        { name: '', value: '' },
    ]);

    const theme = useTheme();
    const mode = theme.palette.mode;

    const [jsonBody, setJsonBody] = useState<string | undefined>(
        body.length ? JSON.parse(decode(body)) : ''
    );

    useEffect(() => {
        window.history.pushState(
            {},
            '',
            `/restful/${state.method}/${state.url.toBase64URL()}${jsonBody?.length ? `/${JSON.stringify(jsonBody).toBase64URL()}` : ''}?${searchParams.toString()}`
        );
    }, [state.method, state.url, jsonBody]);

    useEffect(() => {
        window.history.replaceState(null, '', pathname);

        const newQueries = new URLSearchParams();
        keyValuePairs.forEach((pair) => {
            if (pair.key.length && pair.value.length) {
                newQueries.set(pair.key, pair.value);
            }
        });
        window.history.pushState({}, '', `${pathname}?${newQueries.toString()}`);
    }, [keyValuePairs]);

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
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete(keyValuePairs[index].key);
        const newQuery = currentParams.toString();
        const newUrl = newQuery ? `${pathname}?${newQuery}` : `${pathname}`;
        window.history.pushState({}, '', newUrl);

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
        console.log('Method:', state.method);
        console.log('URL:', state.url);
        console.log('Key-Value Pairs:', keyValuePairs);
        console.log('JSON Body:', jsonBody);
        console.log('Variables:', variables);

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
            const response = await fetch(state.url, {
                method: state.method,
                headers,
                body:
                    state.method !== 'GET' && state.method !== 'DELETE'
                        ? finalJsonBody
                        : undefined,
            });
            const data = (await response.json()) as Record<string, unknown>;

            setResponseStatus(response.statusText);
            setResponseCode(response.status);
            setCode(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ padding: 2 }}>
                <Typography variant="h1">{t('restClient:title')}</Typography>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ width: '100%' }}
                >
                    <Grid item>
                        <FormControl sx={{ minWidth: 120 }} variant="outlined">
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
                                    `/restful/${state.method}/${e.target.value.toBase64URL()}`
                                )
                            }
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
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
                        <Tab
                            label={t('restClient:tabs.headers')}
                            {...tabsProps(0)}
                        />
                        <Tab
                            label={t('restClient:tabs.jsonBody')}
                            {...tabsProps(1)}
                        />
                        <Tab
                            label={t('restClient:tabs.variables')}
                            {...tabsProps(3)}
                        />
                    </Tabs>
                </Box>

                <CustomTabPanel value={tabValue} index={0}>
                    {keyValuePairs.map((pair, index) => (
                        <Grid
                            container
                            spacing={2}
                            sx={{ mb: 2 }}
                            key={index}
                            alignItems="center"
                        >
                            <Grid item xs={5}>
                                <TextField
                                    label={t('restClient:headers.keyPlaceholder')}
                                    placeholder={t(
                                        'restClient:headers.keyPlaceholder'
                                    )}
                                    variant="outlined"
                                    fullWidth
                                    value={pair.key}
                                    onChange={(event) =>
                                        handleKeyChange(index, event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label={t('restClient:headers.valuePlaceholder')}
                                    placeholder={t(
                                        'restClient:headers.valuePlaceholder'
                                    )}
                                    variant="outlined"
                                    fullWidth
                                    value={pair.value}
                                    onChange={(event) =>
                                        handleValueChange(index, event)
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleRemovePair(index)}
                                    aria-label={t('restClient:headers.removeButton')}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddPair}
                        sx={{ marginTop: 2 }}
                    >
                        {t('restClient:headers.addHeaderButton')}
                    </Button>
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
            </Box>

            <Box>
                {responseCode && (
                    <ResponseStatusIndicator
                        responseCode={responseCode}
                        responseStatus={responseStatus}
                    />
                )}
                <Editor
                    height="50vh"
                    defaultLanguage="javascript"
                    defaultValue={t('restClient:response.defaultEditorValue')}
                    value={code}
                    theme={mode === 'light' ? 'light' : 'vs-dark'}
                    options={{
                        minimap: { enabled: false },
                        readOnly: true,
                    }}
                />
            </Box>
        </Container>
    );
};

export { RestClient };
