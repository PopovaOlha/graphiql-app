'use client';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

import styles from '@/components/SignUp/SignUp.module.scss';
import { auth, registerWithEmailAndPassword } from '@/services/firebase';

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(
        null
    );
    const router = useRouter();
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        if (user) {
            router.push('/welcomepage');
        }
    }, [user, router]);

    const handleSignUp = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);

        if (!name) {
            setNameError(t('errorEmpty'));
            return;
        }
        if (!email) {
            setEmailError(t('errorEmpty'));
            return;
        }
        if (!password) {
            setPasswordError(t('errorEmpty'));
            return;
        }
        if (!confirmPassword) {
            setConfirmPasswordError(t('errorEmpty'));
            return;
        }
        const namePattern = /^[\p{L}\p{N} _-]{3,20}$/u;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern =
            /^(?=.*\p{L})(?=.*\p{N})(?=.*[@$!%*?&])[\p{L}\p{N}\p{S}\p{P}]{8,}$/u;

        if (!namePattern.test(name)) {
            setNameError(t('errorName'));
            return;
        }

        if (!emailPattern.test(email)) {
            setEmailError(t('errorEmail'));
            return;
        }

        if (!passwordPattern.test(password)) {
            setPasswordError(t('errorPassword'));
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError(t('errorConfirmPass'));
            return;
        }

        try {
            await registerWithEmailAndPassword(t, name, email, password);
            router.push('/');
            setSuccess(t('successRegister'));
        } catch (error) {
            setError(t('errorSignUp'));
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccess(null);
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
            <form onSubmit={handleSignUp} className={styles.loginForm} noValidate>
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
                    error={!!nameError}
                    helperText={nameError}
                    sx={{
                        '.MuiInputBase-input:-webkit-autofill': {
                            boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                        },
                    }}
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    type="email"
                    label={t('email')}
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                    error={!!emailError}
                    helperText={emailError}
                    data-testid="email-input"
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
                        label={t('password')}
                        name="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!passwordError}
                        helperText={passwordError}
                        data-testid="password-input"
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
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                        data-testid="confirm-password-input"
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
                    data-testid="submit-btn"
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
            <Snackbar
                open={!!success}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignUp;
