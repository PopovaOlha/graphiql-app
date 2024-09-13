'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarMonthOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, BoxProps, Button, styled, Typography } from '@mui/material';
import Link from 'next/link';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

const CustomLink = styled(Box)(({ theme }) => ({
    textDecoration: 'none',
    display: 'inline',
    color: theme.palette.primary.main,
    '&:hover': {
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
    },
    'a:visited &': {
        color: theme.palette.primary.main,
    },
}));

interface MethodBoxProps extends BoxProps {
    method?: string;
}

const MethodBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'method',
})<MethodBoxProps>(({ theme, method }) => ({
    color: theme.palette.custom[method || 'get'],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    padding: '0.25rem 0.5rem',
    border: `1px solid ${theme.palette.custom[method || 'get']}`,
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: 'normal',
    fontWeight: 'bolder',
}));

const HistoryItemLink = styled(Box)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.text.primary,
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.action.hover,
    transition: 'background-color 0.5s',
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

interface HistoryItem {
    method: string;
    timestamp: number;
    url: string;
    path: string;
}

const History = () => {
    useUnauthorizedRedirect();
    const { t } = useTranslation();

    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const historyString = localStorage.getItem('RGC-history') || '';
        if (historyString.length) setHistory(JSON.parse(historyString));
    }, []);

    const handleHistory = () => {
        localStorage.removeItem('RGC-history');
        setHistory([]);
    };

    return (
        <Box>
            <Typography component={'h1'} variant={'h1'}>
                {t('history:title')}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '50rem',
                    margin: '0 auto',
                }}
            >
                {!!history.length && (
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                            margin: '0 auto 40px',
                            display: 'flex',
                        }}
                        onClick={handleHistory}
                    >
                        Remove history
                    </Button>
                )}
                {history.length ? (
                    history
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((item: HistoryItem) => (
                            <Link
                                href={item.path}
                                key={item.timestamp}
                                style={{
                                    marginBottom: '20px',
                                    color: '#fff',
                                    display: 'block',
                                    textDecoration: 'none',
                                }}
                            >
                                <HistoryItemLink>
                                    <MethodBox
                                        method={item.method.toLocaleLowerCase()}
                                    >
                                        {item.method}
                                    </MethodBox>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            color: 'inherit',
                                            opacity: '0.7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        <CalendarMonthOutlined
                                            sx={{ fontSize: '16px' }}
                                        />
                                        {new Date(
                                            item.timestamp
                                        ).toLocaleDateString()}
                                        ,{' '}
                                        {new Date(
                                            item.timestamp
                                        ).toLocaleTimeString()}
                                    </Typography>
                                    <Box
                                        color={'text.primary'}
                                        sx={{
                                            '& b': {
                                                display: 'inline-block',
                                                marginRight: '1rem',
                                            },
                                        }}
                                    >
                                        <b>URL:</b>
                                        {item.url}
                                    </Box>
                                </HistoryItemLink>
                            </Link>
                        ))
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            margin: 'auto',
                        }}
                    >
                        {t('history:empty')}
                        <br /> {t('history:try')}{' '}
                        <Link href="/restful/GET" style={{ textDecoration: 'none' }}>
                            <CustomLink color={'primary'} component={'span'}>
                                RESTFul
                            </CustomLink>
                        </Link>{' '}
                        {t('history:or')}{' '}
                        <Link
                            href="/graphiql/GRAPHQL"
                            style={{ textDecoration: 'none' }}
                        >
                            <CustomLink color={'primary'} component={'span'}>
                                GraphQL
                            </CustomLink>
                        </Link>{' '}
                        {t('history:clients')}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default History;
