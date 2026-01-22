// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY2dOiht7xC63pfQHgECKAwYtzy_ggXBM",
  authDomain: "ai-tripplanner-7d7d8.firebaseapp.com",
  projectId: "ai-tripplanner-7d7d8",
  storageBucket: "ai-tripplanner-7d7d8.firebasestorage.app",
  messagingSenderId: "432415660958",
  appId: "1:432415660958:web:035b557accca37e432148f"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)