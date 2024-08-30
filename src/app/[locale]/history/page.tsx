'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';
import Link from 'next/link';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';
import { removeFromHistory } from '@/store/reducers/historySlice';
import { RootState } from '@/store/store';

const CustomLink = styled(Box)({
    textDecoration: 'none',
    display: 'inline',
    '&:hover': {
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
    },
});

const History = () => {
    useUnauthorizedRedirect();

    const dispatch = useDispatch();
    const history = useSelector((state: RootState) => state.history);

    return (
        <Box>
            <Typography component={'h1'} variant={'h1'}>
                History
            </Typography>
            {history.length ? (
                history.map((item: string, index: number) => (
                    <Typography key={item + '-' + index}>
                        {item}{' '}
                        <IconButton
                            onClick={() => dispatch(removeFromHistory(item))}
                        >
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
                    It&apos;s empty here.
                    <br /> Try to use{' '}
                    <Link href="/restful" style={{ textDecoration: 'none' }}>
                        <CustomLink color={'primary'} component={'span'}>
                            RESTFul
                        </CustomLink>
                    </Link>{' '}
                    or{' '}
                    <Link href="/graphiql" style={{ textDecoration: 'none' }}>
                        <CustomLink color={'primary'} component={'span'}>
                            GraphQL
                        </CustomLink>
                    </Link>{' '}
                    client for request
                </Typography>
            )}
        </Box>
    );
};

export default History;
