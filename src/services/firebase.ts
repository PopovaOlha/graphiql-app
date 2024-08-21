import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<void> => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const userQuery = query(
            collection(db, 'users'),
            where('uid', '==', user.uid)
        );
        const userDocs = await getDocs(userQuery);

        if (userDocs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName || 'Unknown User', // Handle possible null value
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        alert((error as Error).message);
    }
};

const logInWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Email Sign-In Error:', error);
        alert((error as Error).message);
    }
};

const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
): Promise<void> => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (error) {
        console.error('Registration Error:', error);
        alert((error as Error).message);
    }
};

const sendPasswordReset = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (error) {
        console.error('Password Reset Error:', error);
        alert((error as Error).message);
    }
};

const logout = (): void => {
    signOut(auth).catch((error) => {
        console.error('Logout Error:', error);
        alert((error as Error).message);
    });
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
