import { blue, green, orange, purple, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        custom: {
            [key: string]: string | undefined;
        };
    }
    interface PaletteOptions {
        custom: {
            [key: string]: string | undefined;
        };
    }
}

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
            custom: {
                get: green[500],
                post: yellow[500],
                put: blue[500],
                delete: orange[500],
                graphql: purple[500],
            },
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                    disableElevation: true,
                },
            },
            MuiContainer: {
                styleOverrides: {
                    maxWidthXl: {
                        maxWidth: '1920px',
                        '@media (min-width: 1200px)': {
                            maxWidth: '1920px',
                        },
                    },
                },
            },
        },
    });

export default getTheme;
