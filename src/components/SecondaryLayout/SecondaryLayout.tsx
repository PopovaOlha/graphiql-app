'use client';

import { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, BoxProps, IconButton, styled } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GraphIcon, HistoryIcon, RestIcon } from '../Icons';

import styles from './SecondaryLayout.module.scss';

interface LayoutProps extends BoxProps {
    isExpanded?: boolean;
}

const LayoutContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded',
})<LayoutProps>(({ isExpanded }) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: isExpanded ? '16rem 1fr' : '5rem 1fr',
    transition: 'all 0.5s',
    flex: '1 1 100%',
}));

const Panel = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded',
})<LayoutProps>(({ theme, isExpanded }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isExpanded ? 'flex-start' : 'center',
    gap: '1rem',
    padding: '5rem 1rem 1rem',
    backgroundColor: theme.palette.action.hover,
}));

const PanelButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'isExpanded',
})<LayoutProps>(({ isExpanded }) => ({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '3rem',
    height: '3rem',
    '& svg': {
        transition: 'all 0.5s',
        transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
    },
}));

const SecondaryLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const { t } = useTranslation();
    const pathname = usePathname();

    const buttonTitle = isExpanded ? t('clients.collapse') : t('clients.expand');

    return (
        <LayoutContainer
            component={'main'}
            isExpanded={isExpanded}
            className={isExpanded ? styles.expanded : ''}
        >
            <Panel isExpanded={isExpanded}>
                <PanelButton
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={buttonTitle}
                    isExpanded={isExpanded}
                >
                    <ArrowBackIosNewIcon />
                </PanelButton>
                <Link
                    href={'/restful/GET'}
                    className={`${styles.panelLink} ${pathname?.includes('/restful') ? styles.panelLinkActive : ''}`}
                >
                    <RestIcon />
                    REST Api
                </Link>
                <Link
                    href={'/graphiql/GRAPHQL'}
                    className={`${styles.panelLink} ${pathname?.includes('/graphiql') ? styles.panelLinkActive : ''}`}
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
            </Panel>
            <Box>{children}</Box>
        </LayoutContainer>
    );
};

export default SecondaryLayout;
