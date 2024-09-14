import { initializeApp } from 'firebase/app';
import { Auth, updateProfile } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    DocumentData,
    getDocs,
    getFirestore,
    query,
    QuerySnapshot,
    where,
} from 'firebase/firestore';

import { firebaseConfig } from '@/lib/firebaseConfig';
import { showApiError } from '@/utils/showApiError';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (t: (key: string) => string): Promise<void> => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user: User = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs: QuerySnapshot<DocumentData> = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            showApiError('auth/google-sign-in-error', t);
        }
    }
};

const logInWithEmailAndPassword = async (
    t: (key: string) => string,
    auth: Auth,
    email: string,
    password: string
): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            showApiError('auth/login-error', t);
        }
    }
};

const registerWithEmailAndPassword = async (
    t: (key: string) => string,
    name: string,
    email: string,
    password: string
): Promise<void> => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user: User = res.user;

        await updateProfile(user, {
            displayName: name,
        });

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            showApiError('auth/register-error', t);
        }
    }
};

const logout = (): void => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
};
