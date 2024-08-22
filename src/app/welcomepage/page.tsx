'use client';

import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../../components/Header/Header';

const WelcomePage: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Header />
            <Typography variant="body1" gutterBottom>
                Please Sign In or Sign Up to continue.
            </Typography>
        </Container>
    );
};

export default WelcomePage;
