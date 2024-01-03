import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from 'firebase/database';
import { getFirestore, collection, getDocs, setDoc, addDoc } from 'firebase/firestore/lite';


require('dotenv').config();
// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTD
};
// console.log(firebaseConfig);
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// const database = getFirestore(app);
export {app};

interface SubmissionData {
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }

export const saveFormSubmission = async (name: string, email: string, message: string): Promise<void> => {
  try {
    // Basic input validation
    if (!name || !email || !message) {
      throw new Error('All fields are required.');
    }

    const submissionData: SubmissionData = {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };
    console.log("working");
    // Store form submission in Firebase Realtime Database
    // const col = collection(database, 'contacts');
    // await addDoc(col, submissionData);
    console.log('Form submission saved successfully.');
  } catch (error) {
    console.error('Error saving form submission:', error);
    throw error;
  }
};