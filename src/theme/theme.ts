import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

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
                fontSize: '2.5rem',
                fontWeight: 500,
                textAlign: 'center',
                margin: 32,
            },
            h2: {
                color: 'inherit',
                fontSize: '2rem',
                fontWeight: 400,
                textAlign: 'center',
            },
        },
        palette: {
            mode,
        },
    });

export default getTheme;
