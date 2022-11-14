// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC34zUakOc9E76jtTvXtzsSoJ6B0-aUoB4",
  authDomain: "housing-website-dd796.firebaseapp.com",
  projectId: "housing-website-dd796",
  storageBucket: "housing-website-dd796.appspot.com",
  messagingSenderId: "788120743698",
  appId: "1:788120743698:web:b9b37406c8d816cd0d0dcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()