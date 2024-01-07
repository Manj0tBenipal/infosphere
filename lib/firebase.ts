import {
  initializeApp,
  getApps,
  getApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { credential } from "firebase-admin";
import serviceAccount from "@/key.json";
export const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: credential.cert(serviceAccount as ServiceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
export const db = getFirestore(app);

export const guidesCollection = db.collection("guides");
export const storageBucket = getStorage(app).bucket(
  process.env.FIREBASE_STORAGE_BUCKET
);
