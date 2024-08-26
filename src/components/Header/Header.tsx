'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth, logout } from '../../services/firebase';
import { LanguageSelect } from '../LanguageSelect';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

const Header: FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const { t } = useTranslation();

    const handleSignOut = () => {
        logout();
        router.push('/');
    };

    return (
        <header className={styles.header}>
            <Logo />
            <LanguageSelect />
            <nav className={styles.navlist}>
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
