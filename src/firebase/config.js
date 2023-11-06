import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDy1J16R8a3GgTbV06BHirr8FyQBh8Jxm4",
    authDomain: "proyecto-final-e4e17.firebaseapp.com",
    projectId: "proyecto-final-e4e17",
    storageBucket: "proyecto-final-e4e17.appspot.com",
    messagingSenderId: "777616171575",
    appId: "1:777616171575:web:a0ab708416e5b566afd5b2"
  };

  app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
