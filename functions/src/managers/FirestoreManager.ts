import * as admin from "firebase-admin";

export class FirestoreManager {
    private static db: FirebaseFirestore.Firestore;

    public static getDb(): FirebaseFirestore.Firestore {
        if (!FirestoreManager.db) {
            const db = admin.firestore();
            db.settings({
                ignoreUndefinedProperties: true,
            });
            FirestoreManager.db = db;
        }
        return FirestoreManager.db;
    }
}
