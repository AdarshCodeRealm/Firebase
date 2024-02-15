// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATQjxqaQajHdBAgHRWZhnb_WtESLIO-vs",
  authDomain: "development-81f29.firebaseapp.com",
  projectId: "development-81f29",
  storageBucket: "development-81f29.appspot.com",
  messagingSenderId: "173259205736",
  appId: "1:173259205736:web:007f188235a7b64fec5fdd",
  measurementId: "G-E395L8R8HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
