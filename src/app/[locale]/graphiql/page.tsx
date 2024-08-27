'use client';

import { Typography } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

const GraphQClient = () => {
    useUnauthorizedRedirect();
    return <Typography component={'h1'}>GraphQL Client</Typography>;
};

export default GraphQClient;
