import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
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

const TOKEN_LIFETIME_MS = 60 * 60 * 1000;

const monitorTokenExpiration = (user: User): void => {
    console.log(user);
    onIdTokenChanged(auth, async (user) => {
        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            const tokenIssuedAtTime = idTokenResult.issuedAtTime;
            const expirationTime =
                new Date(tokenIssuedAtTime).getTime() + TOKEN_LIFETIME_MS;

            setTimeout(() => {
                logout();
                alert('Your session has expired. Please log in again.');
            }, expirationTime - Date.now());
        }
    });
};

const signInWithGoogle = async (): Promise<void> => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user: User = res.user;

        monitorTokenExpiration(user);

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
    email: string,
    password: string
): Promise<void> => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user: User = res.user;

        monitorTokenExpiration(user);
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

        monitorTokenExpiration(user);
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

const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (err: unknown) {
        console.error('Error during logout: ', err);
        if (err instanceof Error) {
            alert(err.message);
        }
    }
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
