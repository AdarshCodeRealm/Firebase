import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyATQjxqaQajHdBAgHRWZhnb_WtESLIO-vs",
  authDomain: "development-81f29.firebaseapp.com",
  projectId: "development-81f29",
  storageBucket: "development-81f29.appspot.com",
  messagingSenderId: "173259205736",
  appId: "1:173259205736:web:007f188235a7b64fec5fdd",
  measurementId: "G-E395L8R8HC"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
