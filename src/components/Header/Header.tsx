'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Box, BoxProps, Button, Container, styled } from '@mui/material';
import { useRouter } from 'next/navigation';

import { auth, logout } from '../../services/firebase';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { Logo } from '../Logo/Logo';

interface StickyProps extends BoxProps {
    isSticky?: boolean;
}

const LogoWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSticky',
})<StickyProps>(({ theme, isSticky }) => ({
    transition: 'all 0.3s ease',
    color: isSticky ? theme.palette.primary.main : theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: isSticky ? '12rem' : '16rem',
}));

const StyledHeader = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSticky',
})<StickyProps>(({ theme, isSticky }) => ({
    position: 'sticky',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    padding: isSticky ? '0.6rem' : '1.25rem',
    background: isSticky
        ? theme.palette.mode === 'light'
            ? 'rgba(199, 199, 199, 0.6)'
            : 'rgba(37, 37, 37, 0.6)'
        : theme.palette.background.default,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 4px 20px rgba(0, 0, 0, 0.1)'
            : '0 4px 20px rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(2px)',
}));

const StyledNav = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
}));

const Header: FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const { t } = useTranslation();
    const [isSticky, setIsSticky] = useState(false);

    const handleSignOut = () => {
        logout();
        router.push('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <StyledHeader isSticky={isSticky} component={'header'}>
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                <LogoWrapper isSticky={isSticky}>
                    <Logo />
                </LogoWrapper>
                <StyledNav component={'nav'}>
                    <LanguageSelect />
                    {!user ? (
                        <>
                            <Button onClick={() => router.push('/signin')}>
                                {t('signIn')}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/signup')}
                            >
                                {t('signUp')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => router.push('/')}
                            >
                                {t('mainPage')}
                            </Button>
                            <Button variant="outlined" onClick={handleSignOut}>
                                {t('signOut')}
                            </Button>
                        </>
                    )}
                </StyledNav>
            </Container>
        </StyledHeader>
    );
};

export default Header;
