'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, registerWithEmailAndPassword } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    Container,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import styles from './SignUp.module.scss';
import Link from 'next/link';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            setError('Please enter a valid email address.');
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(
                'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
            );
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords must match.');
            return;
        }

        try {
            await registerWithEmailAndPassword(name, email, password);
            router.push('/');
        } catch (error) {
            setError('Failed to sign up. Please try again.');
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Container component="main" maxWidth="xs" className={styles.signupContainer}>
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
                Sign Up
            </Typography>
            <form onSubmit={handleSignUp} className={styles.loginForm}>
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="UserName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
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
                    Sign Up
                </Button>
            </form>
            <Typography variant="body2" className={styles.loginText}>
                Already have an account?{' '}
                <Link className={styles.backlink} href="/signin">
                    Log in
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

export default SignUp;
