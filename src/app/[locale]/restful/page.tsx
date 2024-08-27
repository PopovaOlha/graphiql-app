'use client';

import { Typography } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

const RestfulPage = () => {
    useUnauthorizedRedirect();
    return <Typography component={'h1'}>REST Client</Typography>;
};

export default RestfulPage;
