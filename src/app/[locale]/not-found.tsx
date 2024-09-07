'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean);

        if (segments.length === 1 && segments[0] === 'restful') {
            router.replace('/restful/GET');
        }
    }, [router]);

    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 197px)',
            }}
        >
            <Typography
                component={'h1'}
                sx={{
                    fontSize: '96px',
                    fontWeight: '300',
                    lineHeight: 'normal',
                }}
            >
                404
            </Typography>
            <Typography
                sx={{
                    fontSize: '24px',
                    fontWeight: '500',
                    marginBottom: '50px',
                }}
            >
                {t('errors:404.text')}
            </Typography>
            <Link
                href={'/'}
                style={{
                    textDecoration: 'underline',
                }}
            >
                {t('errors:404.link')}
            </Link>
        </Box>
    );
}
