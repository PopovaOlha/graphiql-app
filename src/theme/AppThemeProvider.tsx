'use client';

import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

import getTheme from './theme';

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = getTheme(prefersDarkMode ? 'dark' : 'light');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export { AppThemeProvider };
