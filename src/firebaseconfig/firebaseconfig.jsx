// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6_Xs28MAJ5Exto38nkU2XL8b0Q5KyT0g",
  authDomain: "appoinment-booking-221dd.firebaseapp.com",
  projectId: "appoinment-booking-221dd",
  storageBucket: "appoinment-booking-221dd.firebasestorage.app",
  messagingSenderId: "672734120067",
  appId: "1:672734120067:web:ee192979028bb7da61b3b6",
  measurementId: "G-V2X4Y5HC9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);

