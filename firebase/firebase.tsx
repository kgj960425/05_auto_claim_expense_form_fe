// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApKf0nxpRT69eRbjsZpwc1boRVgUMuy9c",
  authDomain: "autoclaimexpenseform.firebaseapp.com",
  databaseURL: "https://autoclaimexpenseform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "autoclaimexpenseform",
  storageBucket: "autoclaimexpenseform.firebasestorage.app",
  messagingSenderId: "932450738919",
  appId: "1:932450738919:web:657f0f139e9c952a16b842",
  measurementId: "G-7RBND62P0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);