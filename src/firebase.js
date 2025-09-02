import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANaOf_Fh5WhYX5Qj9jx6EYsTJ8Ku0P6_s",
  authDomain: "ryans-23c28.firebaseapp.com",
  projectId: "ryans-23c28",
  storageBucket: "ryans-23c28.appspot.com",
  messagingSenderId: "1057343594285",
  appId: "1:1057343594285:web:172b9db6378620d6cf3da4",
  measurementId: "G-B5F01C6WK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Sign out function
export const logout = () => signOut(auth);
