'use client';

import CardGroup from '@/components/CardGroup/CardGroup';
import { auth } from '@/services/firebase';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../../styles/welcomepage.module.scss';

const WelcomePage = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <main className={styles.main}>
            {user ? (
                <>
                    <div className="welcomeWrapper">
                        <Typography variant="h1">
                            Welcome Back, {user.displayName}!
                        </Typography>
                        <Typography variant="body1" className={styles.typography}>
                            Our application is designed to simplify your API
                            interactions, making it easier to develop, test, and
                            explore APIs in one place. We hope you enjoy it!
                        </Typography>
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
                    </div>
                </>
            ) : (
                <>
                    <div className="welcomeWrapper">
                        <Typography variant="h1">Welcome!</Typography>
                        <Typography variant="body1" className={styles.typography}>
                            Welcome to our multi-purpose API client application! This
                            tool allows you to interact with any user-specified API,
                            whether it&apos;s RESTful or GraphQL. To start using the
                            application, please register or log in.
                        </Typography>
                        <Box className={styles.buttonContainer}>
                            <Button
                                variant="contained"
                                className={styles.button}
                                onClick={() => router.push('/signin')}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="outlined"
                                className={styles.button}
                                onClick={() => router.push('/signup')}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </div>
                </>
            )}
            <CardGroup />
        </main>
    );
};

export default WelcomePage;
