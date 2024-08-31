'use client';

import { useTranslation } from 'react-i18next';
import { Box, styled, Typography } from '@mui/material';
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

interface HistoryItem {
    method: string;
    timestamp: number;
    url: string;
    path: string;
}

const History = () => {
    useUnauthorizedRedirect();
    const { t } = useTranslation();

    const historyString = localStorage.getItem('RGC-history') || '';

    let history: HistoryItem[] = [];
    if (historyString.length) {
        history = JSON.parse(historyString);
    }

    return (
        <Box>
            <Typography component={'h1'} variant={'h1'}>
                {t('history:title')}
            </Typography>
            {history.length ? (
                history.map((item: HistoryItem) => (
                    <Link
                        href={item.path}
                        key={item.timestamp}
                        style={{
                            marginBottom: '20px',
                            color: '#fff',
                            display: 'block',
                        }}
                    >
                        <div>Method: {item.method}</div>
                        <div>URL: {item.url}</div>
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
                    <Link href="/restful" style={{ textDecoration: 'none' }}>
                        <CustomLink color={'primary'} component={'span'}>
                            RESTFul
                        </CustomLink>
                    </Link>{' '}
                    {t('history:or')}{' '}
                    <Link href="/graphiql" style={{ textDecoration: 'none' }}>
                        <CustomLink color={'primary'} component={'span'}>
                            GraphQL
                        </CustomLink>
                    </Link>{' '}
                    {t('history:clients')}
                </Typography>
            )}
        </Box>
    );
};

export default History;
