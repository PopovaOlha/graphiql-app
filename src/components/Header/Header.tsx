'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../../services/firebase';
import { LanguageSelect } from '../LanguageSelect';
import Image from 'next/image';
import styles from './Header.module.scss';

const Header: FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        logout();
        router.push('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    className={styles.logo}
                    width={100} // Specify a width
                    height={100} // Specify a height
                />
            </div>
            <LanguageSelect />
            <nav className={styles.navlist}>
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
