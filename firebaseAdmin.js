// firebaseAdmin.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
    const rawKey = process.env.FIREBASE_ADMIN_SDK;

    if (!rawKey) {
        throw new Error("FIREBASE_ADMIN_SDK environment variable is not set.");
    }

    let serviceAccount;

    try {
        serviceAccount = JSON.parse(rawKey);
    } catch (error) {
        console.error("🔥 JSON PARSE ERROR:", error);
        throw new Error("Invalid FIREBASE_ADMIN_SDK format in .env");
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
}

const adminDb = admin.database();
export { adminDb };