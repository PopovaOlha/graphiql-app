import { Auth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    User,
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    DocumentData,
    QuerySnapshot,
} from 'firebase/firestore';
import { firebaseConfig } from '@/lib/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<void> => {
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
            alert(err.message);
        }
    }
};

const logInWithEmailAndPassword = async (
    auth: Auth,
    email: string,
    password: string
): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            alert(err.message);
        }
    }
};

const registerWithEmailAndPassword = async (
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
            alert(err.message);
        }
    }
};

const sendPasswordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
            alert(err.message);
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
    sendPasswordReset,
    logout,
};
