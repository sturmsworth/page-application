import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeGkk_tKkPYkTxhTck4bvAuIFxOgy0OwI",
  authDomain: "page-2020-28c30.firebaseapp.com",
  databaseURL: "https://page-2020-28c30.firebaseio.com",
  projectId: "page-2020-28c30",
  storageBucket: "page-2020-28c30.appspot.com",
  messagingSenderId: "584535235270",
  appId: "1:584535235270:web:b4d4662bb7b2bd8cea95c7",
  measurementId: "G-29TKL7R7RR",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
// authForGoogleSignIn exists because it requires firebase.auth for the flow
// not firebase.auth() like the auth constant defined above
export const authForGoogleSignIn = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
