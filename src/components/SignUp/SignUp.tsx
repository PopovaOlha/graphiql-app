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
    Box,
    CssBaseline,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

        try {
            await registerWithEmailAndPassword(name, email, password);
            router.push('/');
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
    };

    return (
        <Container component="main" maxWidth="xs" className={styles.signupContainer}>
            <CssBaseline />
            <Paper elevation={3} className={styles.signupPaper}>
                <Typography
                    variant="h5"
                    component="h1"
                    className={styles.signupTitle}
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSignUp}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="E-mail Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            variant="outlined"
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
                            className={styles.signupButton}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </form>
                <div>
                    Already have an account? <a href="/signin">Log in</a> now.
                </div>
            </Paper>
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
