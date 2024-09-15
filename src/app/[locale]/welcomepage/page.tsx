'use client';

import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const sectionWelcome = useRef<HTMLElement>(null);
    const sectionAuthors = useRef<HTMLElement>(null);
    const sectionCourse = useRef<HTMLElement>(null);

    return (
        <main className={styles.main}>
            <section className={styles.section} ref={sectionWelcome}>
                {user ? (
                    <div className={styles.welcomeWrapper}>
                        <Typography variant="h1">
                            {t('welcomePage:welcomeBack', {
                                name: user.displayName,
                            })}
                        </Typography>
                        <Typography variant="body1" className={styles.typography}>
                            {t('welcomePage:appDescriptionLoggedIn')}
                        </Typography>
                        <Box className={styles.buttonContainer}>
                            <Button
                                variant="contained"
                                className={styles.button}
                                onClick={() => router.push('/restful/GET')}
                            >
                                {t('welcomePage:restClient')}
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.button}
                                onClick={() => router.push('/graphiql/GRAPHQL')}
                            >
                                {t('welcomePage:graphiqlClient')}
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.button}
                                onClick={() => router.push('/history')}
                            >
                                {t('welcomePage:history')}
                            </Button>
                        </Box>
                    </div>
                ) : (
                    <div className={styles.welcomeWrapper}>
                        <Typography variant="h1">
                            {t('welcomePage:welcome')}
                        </Typography>
                        <Typography variant="body1" className={styles.typography}>
                            {t('welcomePage:appDescriptionLoggedOut')}
                        </Typography>
                        <Box className={styles.buttonContainer}>
                            <Button
                                variant="contained"
                                className={styles.button}
                                onClick={() => router.push('/signin')}
                            >
                                {t('welcomePage:signIn')}
                            </Button>
                            <Button
                                variant="outlined"
                                className={styles.button}
                                onClick={() => router.push('/signup')}
                            >
                                {t('welcomePage:signUp')}
                            </Button>
                        </Box>
                    </div>
                )}
                <div className={styles.scrollButton}>
                    <ScrollButton
                        title={t('welcomePage:authors')}
                        targetRef={sectionAuthors}
                    />
                </div>
            </section>
            <section className={styles.section} ref={sectionAuthors}>
                <CardGroup />
                <div className={styles.scrollButton}>
                    <ScrollButton
                        title={t('welcomePage:rsSchool')}
                        targetRef={sectionCourse}
                    />
                </div>
            </section>
            <section className={styles.section} ref={sectionCourse}>
                <RSSchoolReactCourse />
                <div className={styles.scrollButton}>
                    <ScrollButtonTop
                        title={t('welcomePage:top')}
                        targetRef={sectionWelcome}
                    />
                </div>
            </section>
        </main>
    );
};

export default WelcomePage;
