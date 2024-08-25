import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        typography: {
            fontFamily: inter.style.fontFamily,
            h1: {
                color: 'inherit',
                fontSize: '36px',
                fontWeight: 500,
                textAlign: 'center',
            },
        },
        palette: {
            mode,
        },
    });

export default getTheme;
