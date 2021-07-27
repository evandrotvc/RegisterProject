import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZ1tfkROm1SOkTsIa7c1TmTyQizhhLe-M",
    authDomain: "userregistration-58783.firebaseapp.com",
    projectId: "userregistration-58783",
    storageBucket: "userregistration-58783.appspot.com",
    messagingSenderId: "972294904230",
    appId: "1:972294904230:web:709a9a0dadc3bce02b9767",
    measurementId: "G-XJ14HGNMJ9"
  };; //this is where your firebase app values you copied will go

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// export const auth = firebase.auth();

