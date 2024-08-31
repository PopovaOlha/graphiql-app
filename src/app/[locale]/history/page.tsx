'use client';

import { useTranslation } from 'react-i18next';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';
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

const History = () => {
    useUnauthorizedRedirect();
    const { t } = useTranslation();

    const history: string[] = [];

    return (
        <Box>
            <Typography component={'h1'} variant={'h1'}>
                {t('history:title')}
            </Typography>
            {history.length ? (
                history.map((item: string, index: number) => (
                    <Typography key={item + '-' + index}>
                        {item}{' '}
                        <IconButton onClick={() => console.log(item)}>
                            <Delete />
                        </IconButton>
                    </Typography>
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
