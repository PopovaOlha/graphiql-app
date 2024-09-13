'use client';
import { useEffect, useState } from 'react';
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

import styles from '@/components/SignIn/SignIn.module.scss';
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from '@/services/firebase';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
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

        setEmailError(null);
        setPasswordError(null);

        if (!email) {
            setEmailError(t('errorEmpty'));
            return;
        }

        if (!password) {
            setPasswordError(t('errorEmpty'));
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern =
            /^(?=.*\p{L})(?=.*\p{N})(?=.*[@$!%*?&])[\p{L}\p{N}\p{S}\p{P}]{8,}$/u;

        if (!emailPattern.test(email)) {
            setEmailError(t('errorEmail'));
            return;
        }

        if (!passwordPattern.test(password)) {
            setPasswordError(t('errorPassword'));
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
            <form onSubmit={handleLogin} className={styles.loginForm} noValidate>
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
                        error={!!passwordError}
                        helperText={passwordError}
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignIn;
