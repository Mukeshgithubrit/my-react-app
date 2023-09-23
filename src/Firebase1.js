import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCD-6HJ84GQXyjWwHCqywsiNC0zcPx0PLg",
  authDomain: "fir-course-60a57.firebaseapp.com",
  projectId: "fir-course-60a57",
  storageBucket: "fir-course-60a57.appspot.com",
  messagingSenderId: "798047587663",
  appId: "1:798047587663:web:697080e59a5ef4f438893a",
  measurementId: "G-XF8FWHSTMQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

