// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC99XEL3KLPAHTswfiujq5YCv30HvwOWKI",
  authDomain: "sociovert-91f8b.firebaseapp.com",
  projectId: "sociovert-91f8b",
  storageBucket: "sociovert-91f8b.appspot.com",
  messagingSenderId: "855541082316",
  appId: "1:855541082316:web:d5b16157f012c25ed0fa69",
  measurementId: "G-2E2DJHTXB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);