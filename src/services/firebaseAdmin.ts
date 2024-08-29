import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from '../config/secret.json';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
            serviceAccount as firebaseAdmin.ServiceAccount
        ),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
}

export { firebaseAdmin };
