import { UserInformation } from "./interfaces";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtLMz_5nWjMpCggg0SaytEOBqxUn9taUc",
  authDomain: "savemypast-48c66.firebaseapp.com",
  projectId: "savemypast-48c66",
  storageBucket: "savemypast-48c66.appspot.com",
  messagingSenderId: "350471324512",
  appId: "1:350471324512:web:fc1d052966e876eb3f5405",
  measurementId: "G-YMP1GSRT2B",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
