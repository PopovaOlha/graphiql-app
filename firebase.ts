
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdFK3TxJOxeYolI-diryJG6FlxbvYSucA",
  authDomain: "graphiql-app-54240.firebaseapp.com",
  projectId: "graphiql-app-54240",
  storageBucket: "graphiql-app-54240.appspot.com",
  messagingSenderId: "620346154079",
  appId: "1:620346154079:web:c35daf068b5d387d9d4fea",
  measurementId: "G-93S99HNE0Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };