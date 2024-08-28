'use client';

import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

interface RestfulPageState {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
}

interface KeyValuePair {
    key: string;
    value: string;
}

interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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

const RestfulPage = () => {
    useUnauthorizedRedirect();

    const [state, setState] = useState<RestfulPageState>({
        method: 'GET',
        url: '',
    });

    const [tabValue, setTabValue] = useState<number>(0);
    const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([
        { key: '', value: '' },
    ]);

    const [jsonBody, setJsonBody] = useState<string>('');

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
        const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
        setKeyValuePairs(newKeyValuePairs);
    };

    const handleJsonBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJsonBody(event.target.value);
    };

    const handleSubmit = async () => {
        console.log('Method:', state.method);
        console.log('URL:', state.url);
        console.log('Key-Value Pairs:', keyValuePairs);
        console.log('JSON Body:', jsonBody);

        const headers: Record<string, string> = {};
        keyValuePairs.forEach((pair) => {
            if (pair.key && pair.value) {
                headers[pair.key] = pair.value;
            }
        });

        try {
            const response = await fetch(state.url, {
                method: state.method,
                headers,
                body:
                    state.method !== 'GET' && state.method !== 'DELETE'
                        ? jsonBody
                        : undefined,
            });
            const data = (await response.json()) as Record<string, unknown>;
            console.log('Response Data:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom component="div">
                REST Client
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Method</InputLabel>
                        <Select
                            value={state.method}
                            onChange={handleMethodChange}
                            label="Method"
                        >
                            <MenuItem value="GET">GET</MenuItem>
                            <MenuItem value="POST">POST</MenuItem>
                            <MenuItem value="PUT">PUT</MenuItem>
                            <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Endpoint URL"
                        type="url"
                        placeholder="https://swapi.dev/api/films/"
                        variant="outlined"
                        value={state.url}
                        onChange={handleUrlChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Headers" {...tabsProps(0)} />
                    <Tab label="JSON Body" {...tabsProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                {keyValuePairs.map((pair, index) => (
                    <Grid container spacing={2} key={index} alignItems="center">
                        <Grid item xs={5}>
                            <TextField
                                label="Key"
                                placeholder="Key"
                                variant="outlined"
                                fullWidth
                                value={pair.key}
                                onChange={(event) => handleKeyChange(index, event)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Value"
                                placeholder="Value"
                                variant="outlined"
                                fullWidth
                                value={pair.value}
                                onChange={(event) => handleValueChange(index, event)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                color="secondary"
                                onClick={() => handleRemovePair(index)}
                                aria-label="remove"
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
                    Add Header
                </Button>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <TextField
                    label="JSON Body"
                    placeholder="Enter text here"
                    multiline
                    fullWidth
                    rows={10}
                    variant="outlined"
                    value={jsonBody}
                    onChange={handleJsonBodyChange}
                />
            </CustomTabPanel>
        </Box>
    );
};

export default RestfulPage;
