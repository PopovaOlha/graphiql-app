'use client';

import { FC, ReactNode, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';

import styles from './SecondaryLayout.module.scss';
import { GraphIcon, HistoryIcon, RestIcon } from '../Icons';

const SecondaryLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const buttonTitle = isExpanded ? 'Collapse' : 'Expand';

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
                <Link href={'/restful'} className={styles.panelLink}>
                    <RestIcon />
                    REST Client
                </Link>
                <Link href={'/graphiql'} className={styles.panelLink}>
                    <GraphIcon />
                    GraphiQL Client
                </Link>
                <Link href={'/history'} className={styles.panelLink}>
                    <HistoryIcon />
                    History
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
