import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100svh',
            }}
        >
            <Typography
                component={'h1'}
                sx={{
                    fontSize: '96px',
                    fontWeight: '300',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                404
            </Typography>
            <Typography
                sx={{
                    fontSize: '24px',
                    fontWeight: '500',
                    marginBottom: '50px',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                This page does not exist
            </Typography>
            <Link
                href={'/'}
                style={{
                    textDecoration: 'underline',
                    textUnderlineOffset: '6px',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                Go to the main page
            </Link>
        </Box>
    );
}
