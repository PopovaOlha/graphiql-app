'use client';

import { Typography } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

const History = () => {
    useUnauthorizedRedirect();
    return <Typography component={'h1'}>History</Typography>;
};

export default History;
