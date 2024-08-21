'use client';

import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';
import { useRouter } from 'next/navigation';
import Login from './login/page';

const Home: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <Login />;
};

export default Home;
