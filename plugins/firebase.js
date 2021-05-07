import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyA4W2a76T6p4QF-gRCC767ZwMAlX3OjKrM",
  authDomain: "ecom-1-4de2c.firebaseapp.com",
  databaseURL: "https://ecom-1-4de2c.firebaseio.com",
  projectId: "ecom-1-4de2c",
  storageBucket: "ecom-1-4de2c.appspot.com",
  messagingSenderId: "712743596518",
  appId: "1:712743596518:web:1fca9addfd19ed19b9a627"
};

let app = null;

// Initialize Firebase
!firebase.apps.length ? (app = firebase.initializeApp(firebaseConfig)) : "";

export const fb = firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
