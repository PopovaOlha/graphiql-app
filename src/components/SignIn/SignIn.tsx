'use client';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    Snackbar,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from '../../services/firebase';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleLogin = async (e: React.FormEvent): Promise<void> => {
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

        try {
            await logInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            setError(t('errorLogin'));
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
            className={styles.loginContainer}
            sx={{
                display: 'flex',
            }}
        >
            <Typography component="h1" variant="h1">
                {t('signIn')}
            </Typography>
            <form onSubmit={handleLogin} className={styles.loginForm}>
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
                    sx={{
                        '.MuiInputBase-input:-webkit-autofill': {
                            boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                        },
                    }}
                />
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        type={isVisible ? 'text' : 'password'}
                        autoComplete="password"
                        label={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password"
                        sx={{
                            '.MuiInputBase-input:-webkit-autofill': {
                                boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            },
                        }}
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
                    className={styles.loginButton}
                    size="large"
                    disableElevation
                    disableRipple
                    sx={{
                        marginTop: '24px',
                    }}
                >
                    {t('login')}
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={signInWithGoogle}
                    className={styles.loginButton}
                    startIcon={<Google />}
                    size="large"
                >
                    {t('loginGoogle')}
                </Button>
            </form>
            <Typography variant="body2" className={styles.loginText}>
                {t('accountTextSignIn')}{' '}
                <Link href="/signup" className={styles.backlink}>
                    {t('signUp')}
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

export default SignIn;
