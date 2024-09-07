import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

import Preloader from '@/components/Preloader/Preloader';
import { auth } from '@/services/firebase';

export interface IProps {
    children: React.ReactNode;
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

interface AuthContext {
    isAuth: boolean;
    setisAuth?: TypeSetState<AuthContext['isAuth']>;
}

export const AuthContext = createContext<AuthContext>({ isAuth: false });

export default function AuthProvider({ children }: IProps) {
    const [isAuth, setisAuth] = useState(false);
    const [user, loading] = useIdToken(auth);

    useEffect(() => {
        if (user && !loading) {
            setisAuth(true);
        } else if (!user && !loading) {
            setisAuth(false);
        }
    });

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {loading ? <Preloader view={'full'} /> : ''}
            {children}
        </AuthContext.Provider>
    );
}
