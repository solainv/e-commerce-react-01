// src\firebase.config.js

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAlhcuKsMfEc9gMbnzwaYmuqcvqkMD7Vcg",
    authDomain: "maltimart-81b99.firebaseapp.com",
    projectId: "maltimart-81b99",
    storageBucket: "maltimart-81b99.appspot.com",
    messagingSenderId: "130648843205",
    appId: "1:130648843205:web:aae57bb0cc4dd24845a1ac"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;