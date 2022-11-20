// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
