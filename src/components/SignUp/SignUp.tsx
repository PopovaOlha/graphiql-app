'use client';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth, registerWithEmailAndPassword } from '../../services/firebase';

import styles from './SignUp.module.scss';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/welcomepage');
        }
    }, [user, router]);

    const handleSignUp = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailPattern.test(email)) {
            setError(t('errorEmail'));
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(t('errorPassword'));
            return;
        }
        if (password !== confirmPassword) {
            setError(t('errorConfirmPass'));
            return;
        }

        try {
            await registerWithEmailAndPassword(name, email, password);
            router.push('/');
        } catch (error) {
            setError(t('errorSignUp'));
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            className={styles.signupContainer}
            sx={{
                display: 'flex',
            }}
        >
            <Typography component="h1" variant="h1">
                {t('signUp')}
            </Typography>
            <form onSubmit={handleSignUp} className={styles.loginForm}>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    type="text"
                    label={t('userName')}
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    id="full_name"
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    type="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                />
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type={isVisible ? 'text' : 'password'}
                        label={t('password')}
                        name="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: '0',
                            bottom: '10px',
                        }}
                        onClick={() => setIsVisible(!isVisible)}
                        size="small"
                    >
                        {isVisible ? (
                            <VisibilityOff fontSize="inherit" />
                        ) : (
                            <Visibility fontSize="inherit" />
                        )}
                    </IconButton>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type={isVisible ? 'text' : 'password'}
                        label={t('passwordConfirm')}
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: '0',
                            bottom: '10px',
                        }}
                        onClick={() => setIsVisible(!isVisible)}
                        size="small"
                    >
                        {isVisible ? (
                            <VisibilityOff fontSize="inherit" />
                        ) : (
                            <Visibility fontSize="inherit" />
                        )}
                    </IconButton>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={styles.signupButton}
                    size="large"
                    disableElevation
                    disableRipple
                    sx={{
                        marginTop: '24px',
                    }}
                >
                    {t('signUp')}
                </Button>
            </form>
            <Typography variant="body2" className={styles.loginText}>
                {t('accountTextSignUp')}{' '}
                <Link className={styles.backlink} href="/signin">
                    {t('signIn')}
                </Link>{' '}
                {t('now')}.
            </Typography>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignUp;
