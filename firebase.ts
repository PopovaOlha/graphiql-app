// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdFK3TxJOxeYolI-diryJG6FlxbvYSucA",
  authDomain: "graphiql-app-54240.firebaseapp.com",
  projectId: "graphiql-app-54240",
  storageBucket: "graphiql-app-54240.appspot.com",
  messagingSenderId: "620346154079",
  appId: "1:620346154079:web:c35daf068b5d387d9d4fea",
  measurementId: "G-93S99HNE0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);