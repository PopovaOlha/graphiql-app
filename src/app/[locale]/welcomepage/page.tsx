'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { auth } from '@/services/firebase';
import styles from '@/styles/welcomepage.module.scss';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const WelcomePage: FC = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Header />
            <main>
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
            </main>
            <Footer />
        </div>
    );
};

export default WelcomePage;
