'use client';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { auth } from '@/services/firebase';

const useUnauthorizedRedirect = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        }
    }, [user, loading, router]);

    if (loading) {
        return <Typography component={'h1'}>Loading...</Typography>;
    }

    return null;
};

export default useUnauthorizedRedirect;
