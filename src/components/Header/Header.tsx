'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { auth, logout } from '../../services/firebase';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import Logo from '../Logo/Logo';

import styles from './Header.module.scss';

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
            if (window.scrollY > 50) {
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
        <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
            <div
                className={`${styles.logoWrapper} ${isSticky ? styles.sticky : ''}`}
            >
                <Logo />
            </div>
            <nav className={styles.navlist}>
                <div
                    className={`${styles.languageSelectWrapper} ${isSticky ? styles.sticky : ''}`}
                >
                    <LanguageSelect />
                </div>
                <div className={styles.buttonContainer}>
                    {!user ? (
                        <>
                            <Button
                                className={styles.button}
                                onClick={() => router.push('/signin')}
                            >
                                {t('signIn')}
                            </Button>
                            <Button
                                className={styles.button}
                                variant="outlined"
                                onClick={() => router.push('/signup')}
                            >
                                {t('signUp')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className={styles.button}
                                variant="contained"
                                onClick={() => router.push('/')}
                            >
                                {t('mainPage')}
                            </Button>
                            <Button
                                className={styles.button}
                                variant="outlined"
                                onClick={handleSignOut}
                            >
                                {t('signOut')}
                            </Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
