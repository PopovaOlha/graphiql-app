'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <nav className={styles.navlist}>
                <h2 className={styles.title}>WelcomePage</h2>
                <div className={styles.container}>
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
