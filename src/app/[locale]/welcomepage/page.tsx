'use client';

import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import CardGroup from '@/components/CardGroup/CardGroup';
import RSSchoolReactCourse from '@/components/RSSchoolReactCourse/RSSchoolReactCourse';
import ScrollButton from '@/components/ScrollButton/ScrollButton';
import ScrollButtonTop from '@/components/ScrollButtonTop/ScrollButtonTop';
import { auth } from '@/services/firebase';
import styles from '@/styles/welcomepage.module.scss';

const WelcomePage = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const sectionWelcome = useRef<HTMLElement>(null);
    const sectionAuthors = useRef<HTMLElement>(null);
    const sectionCourse = useRef<HTMLElement>(null);

    return (
        <main className={styles.main}>
            <section className={styles.section} ref={sectionWelcome}>
                {user ? (
                    <div className={styles.welcomeWrapper}>
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
                ) : (
                    <div className={styles.welcomeWrapper}>
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
                )}
                <div className={styles.scrollButton}>
                    <ScrollButton title="Authors" targetRef={sectionAuthors} />
                </div>
            </section>
            <section className={styles.section} ref={sectionAuthors}>
                <CardGroup />
                <div className={styles.scrollButton}>
                    <ScrollButton title="RS School" targetRef={sectionCourse} />
                </div>
            </section>
            <section className={styles.section} ref={sectionCourse}>
                <RSSchoolReactCourse />
                <div className={styles.scrollButton}>
                    <ScrollButtonTop title="Top" targetRef={sectionWelcome} />
                </div>
            </section>
        </main>
    );
};

export default WelcomePage;
