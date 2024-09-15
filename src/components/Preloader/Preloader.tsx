'use client';

import { Box, CircularProgress, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const AnimatedCircularProgress = styled(CircularProgress)(({ theme }) => ({
    '@keyframes colorChange': {
        '0%': { stroke: theme.palette.custom.get },
        '25%': { stroke: theme.palette.custom.post },
        '50%': { stroke: theme.palette.custom.put },
        '75%': { stroke: theme.palette.custom.delete },
        '100%': { stroke: theme.palette.custom.graphql },
    },
    '& .MuiCircularProgress-circle': {
        animation: 'colorChange 2s infinite',
    },
}));

const Preloader = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.palette.background.default,
            }}
        >
            <AnimatedCircularProgress />
        </Box>
    );
};

export { Preloader };
