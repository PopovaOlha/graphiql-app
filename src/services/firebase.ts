import { initializeApp } from 'firebase/app';
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
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
        startAutoLogout();
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
        startAutoLogout();
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
        startAutoLogout();
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
    console.log('User logged out');
};

const startAutoLogout = (): void => {
    setTimeout(
        () => {
            logout();
        },
        2 * 60 * 1000
    );
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    logout,
    registerWithEmailAndPassword,
    sendPasswordReset,
    signInWithGoogle,
};
