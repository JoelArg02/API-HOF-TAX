import admin from 'firebase-admin';
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
