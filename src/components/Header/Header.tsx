'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../services/firebase';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

const Header: FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
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
                                Sign In
                            </Button>
                            <Button
                                className={styles.button}
                                variant="outlined"
                                onClick={() => router.push('/signup')}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <Button
                            className={styles.button}
                            variant="outlined"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
