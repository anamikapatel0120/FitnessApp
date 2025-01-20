// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyB8dr7mZysBgQP7Ermo1Jo-E2Eyw6vWF5M",
//   authDomain: "my-app-aa579.firebaseapp.com",
//   projectId: "my-app-aa579",
//   storageBucket: "my-app-aa579.firebasestorage.app",
//   messagingSenderId: "682924932256",
//   appId: "1:682924932256:web:39d6c6f1fd4b0d12e1ddc5",
//   measurementId: "G-YNN614L1DD"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export const db = getFirestore(app);
// export const storage = getStorage(app);


// export {  RecaptchaVerifier, signInWithPhoneNumber };

// export default app;



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,  
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";

const firebaseConfig = {
  // apiKey: "YOUR_API_KEY",
  // authDomain: "YOUR_AUTH_DOMAIN",
  // projectId: "YOUR_PROJECT_ID",
  // storageBucket: "YOUR_STORAGE_BUCKET",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  // appId: "YOUR_APP_ID",
  // measurementId: "YOUR_MEASUREMENT_ID",

  
  apiKey: "AIzaSyB8dr7mZysBgQP7Ermo1Jo-E2Eyw6vWF5M",
  authDomain: "my-app-aa579.firebaseapp.com",
  projectId: "my-app-aa579",
  storageBucket: "my-app-aa579.firebasestorage.app",
  messagingSenderId: "682924932256",
  appId: "1:682924932256:web:39d6c6f1fd4b0d12e1ddc5",
  measurementId: "G-YNN614L1DD"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Firebase Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Utility Functions for Firestore
export const addNewDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const updateExistingDocument = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const setDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    console.log("Document written with ID: ", docId);
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
};

// Export Authentication utilities
export const createUser = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
// export const RecaptchaVerifier = RecaptchaVerifier;
export const signInWithPhone = signInWithPhoneNumber;

// Default export for the app instance
export default app;
