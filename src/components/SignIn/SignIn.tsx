'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    Container,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import styles from './SignIn.module.scss';
import Link from 'next/link';
import { Google } from '@mui/icons-material';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            setError('Please enter a valid email address.');
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(
                'Password must contain at least 8 characters, including one letter, one digit, and one special character.'
            );
            return;
        }

        try {
            await logInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            setError('Failed to log in. Please check your credentials.');
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Container component="main" maxWidth="xs" className={styles.loginContainer}>
            <Typography
                component="h1"
                sx={{
                    width: 300,
                    color: 'inherit',
                    fontSize: '36px',
                    fontWeight: 500,
                    textAlign: 'center',
                }}
            >
                Sign In
            </Typography>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="E-mail Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
                    Login
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
                    Login with Google
                </Button>
            </form>
            <Typography variant="body2" className={styles.loginText}>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className={styles.backlink}>
                    Sign up
                </Link>{' '}
                now.
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
