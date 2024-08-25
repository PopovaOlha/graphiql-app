'use client';

import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
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
