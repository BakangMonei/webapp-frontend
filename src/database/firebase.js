import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add Auth
import { collection, getFirestore } from "firebase/firestore"; // Add Firestore
import { getDatabase } from "firebase/database"; // Add Realtime Database
import { getStorage } from "firebase/storage"; // Add Storage
import { query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp); // Initialize Auth 
const firestore = getFirestore(firebaseApp); // Initialize Firestore
const database = getDatabase(firebaseApp); // Initialize Realtime Database
const storage = getStorage(firebaseApp); // Initialize Storage
const analytics = getAnalytics(firebaseApp); // Initialize Analytics


export { auth, firestore, database, storage, analytics, firebaseApp };