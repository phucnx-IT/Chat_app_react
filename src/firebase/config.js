// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {connectAuthEmulator, getAuth} from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLXVj3r0GU95bZklSRhf90KxVOwpQq-4Q",
  authDomain: "chat-app-fbab1.firebaseapp.com",
  projectId: "chat-app-fbab1",
  storageBucket: "chat-app-fbab1.appspot.com",
  messagingSenderId: "327189147699",
  appId: "1:327189147699:web:5af076eb6b9932d8b7b346",
  measurementId: "G-CNR08615J5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = getAnalytics();
const auth = getAuth();
connectAuthEmulator(auth,"http://localhost:9099")
const database = getFirestore();
connectFirestoreEmulator(database,'localhost',8080)
export {analytics, auth, database};
export default firebase;