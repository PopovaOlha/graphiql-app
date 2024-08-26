import { firebaseAdmin } from '../services/firebaseAdmin';

export const verifyIdToken = async (idToken: string) => {
    return await firebaseAdmin.auth().verifyIdToken(idToken);
};
