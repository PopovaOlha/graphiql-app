'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '@monaco-editor/react';
import { Box, Container, Typography, useTheme } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';
import { ResponseStatus } from '@/types/interfaces';

import { ResponseStatusIndicator, RestForm } from './RestClientComponents';

const RestClient = ({ body }: { body: string }) => {
    useUnauthorizedRedirect();
    const { t } = useTranslation();
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [code, setCode] = useState<string>(
        t('restClient:response.defaultEditorValue')
    );
    const [response, setResponse] = useState<ResponseStatus | null>(null);

    const handleCode = (data: string) => {
        setCode(data);
    };
    const handleResponseStatus = (responseStatus: ResponseStatus) => {
        setResponse(responseStatus);
    };

    return (
        <Container maxWidth="xl">
            <Box>
                <Typography variant="h1">{t('restClient:title')}</Typography>

                <RestForm
                    body={body}
                    sendAnswer={handleCode}
                    sendResponseStatus={handleResponseStatus}
                />
            </Box>

            <Box>
                {response?.code && (
                    <ResponseStatusIndicator
                        responseCode={response.code}
                        responseStatus={response.status}
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
