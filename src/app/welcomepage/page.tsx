'use client';

import { Typography, Button, Box } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import Header from '../../components/Header/Header';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import styles from '../../styles/welcomepage.module.css';

const WelcomePage: FC = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Header />
            {user ? (
                <>
                    <h1 className={styles.title}>
                        Welcome Back, {user.displayName}!
                    </h1>
                    <Box className={styles.buttonContainer}>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => router.push('/restful')}
                        >
                            REST Client
                        </Button>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => router.push('/graphiql')}
                        >
                            GraphiQL Client
                        </Button>
                        <Button
                            variant="contained"
                            className={styles.button}
                            onClick={() => router.push('/history')}
                        >
                            History
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="body1" className={styles.typography}>
                        Please{' '}
                        <a href="/signin" className={styles.link}>
                            Sign In
                        </a>{' '}
                        or{' '}
                        <a href="/signup" className={styles.link}>
                            Sign Up
                        </a>{' '}
                        to continue.
                    </Typography>
                </>
            )}
        </div>
    );
};

export default WelcomePage;
