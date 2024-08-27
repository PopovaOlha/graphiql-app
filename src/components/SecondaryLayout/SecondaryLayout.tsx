'use client';

import { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './SecondaryLayout.module.scss';
import { GraphIcon, HistoryIcon, RestIcon } from '../Icons';

const SecondaryLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const { t } = useTranslation();
    const pathname = usePathname();

    const buttonTitle = isExpanded ? t('clients.collapse') : t('clients.expand');

    return (
        <Box
            component={'main'}
            className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
        >
            <Box
                className={styles.panel}
                sx={{
                    bgcolor: 'action.hover',
                }}
            >
                <Link
                    href={'/restful'}
                    className={`${styles.panelLink} ${pathname === '/restful' ? styles.panelLinkActive : ''}`}
                >
                    <RestIcon />
                    REST Api
                </Link>
                <Link
                    href={'/graphiql'}
                    className={`${styles.panelLink} ${pathname === '/graphiql' ? styles.panelLinkActive : ''}`}
                >
                    <GraphIcon />
                    GraphiQL
                </Link>
                <Link
                    href={'/history'}
                    className={`${styles.panelLink} ${pathname === '/history' ? styles.panelLinkActive : ''}`}
                >
                    <HistoryIcon />
                    {t('clients.history')}
                </Link>
                <IconButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={buttonTitle}
                    sx={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        width: '3rem',
                        height: '3rem',
                    }}
                    className={styles.panelButton}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    p: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default SecondaryLayout;
