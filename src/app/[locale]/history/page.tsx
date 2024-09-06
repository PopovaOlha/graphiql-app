'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import useUnauthorizedRedirect from '@/hooks/useUnauthorizedRedirect';

const History = () => {
    useUnauthorizedRedirect();
    const [savedApis, setSavedApis] = useState<string[]>([]);
    const [showSavedApis, setShowSavedApis] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedApis') || '[]');
        setSavedApis(saved);
    }, []);

    const handleShowApis = () => {
        setShowSavedApis(true);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleShowApis}>
                GraphQL
            </Button>
            {showSavedApis && (
                <div>
                    {savedApis.length > 0 ? (
                        savedApis.map((apiUrl, index) => (
                            <div key={index} style={{ margin: '10px 0' }}>
                                <Typography>{apiUrl}</Typography>
                            </div>
                        ))
                    ) : (
                        <Typography>No saved APIs found.</Typography>
                    )}
                </div>
            )}
        </div>
    );
};

export default History;
