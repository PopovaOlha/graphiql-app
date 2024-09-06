'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Button, Typography } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';
import { auth } from '@/services/firebase';
import styles from '@/styles/history.module.scss';

const History = () => {
    useUnauthorizedRedirect();
    const [savedApis, setSavedApis] = useState<string[]>([]);
    const [showSavedApis, setShowSavedApis] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('savedApis');
        } else {
            const saved = JSON.parse(localStorage.getItem('savedApis') || '[]');
            setSavedApis(saved);
        }
    }, [user]);

    const handleShowApis = () => {
        setShowSavedApis(true);
    };

    return (
        <div>
            <Box className={styles.container}>
                <Typography className={styles.title}>
                    History of Saved GraphQL APIs
                </Typography>
                <Button
                    className={styles.button}
                    variant="contained"
                    onClick={handleShowApis}
                >
                    GraphQL
                </Button>
                {showSavedApis && (
                    <Box className={styles.savedApisContainer}>
                        {savedApis.length > 0 ? (
                            savedApis.map((apiUrl, index) => (
                                <Box key={index} className={styles.apiItem}>
                                    <Typography>{apiUrl}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography className={styles.noApis}>
                                No saved APIs found.
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default History;
