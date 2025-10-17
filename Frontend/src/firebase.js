// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "estatemarketing-d636c.firebaseapp.com",
    projectId: "estatemarketing-d636c",
    storageBucket: "estatemarketing-d636c.firebasestorage.app",
    messagingSenderId: "137827909773",
    appId: "1:137827909773:web:8d4949353f0ca58ca062c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);