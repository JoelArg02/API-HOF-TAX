import admin from 'firebase-admin';
import serviceAccount from './hof-tax-firebase-adminsdk-uj5ac-442db37ca4.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
