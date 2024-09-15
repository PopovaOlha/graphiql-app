import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../lib/firebaseConfig';

export const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
