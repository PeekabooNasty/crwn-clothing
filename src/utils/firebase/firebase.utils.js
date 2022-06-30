import { getAllByTestId } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth,              // create auth instance
  signInWithRedirect,   //
  signInWithPopup,      //
  GoogleAuthProvider    //
} from 'firebase/auth'; 

import {
  getFirestore,
  doc,    // retrieve documents inside firestore database
  getDoc, // getting document's data
  setDoc  // setting document's data
} from 'firebase/firestore';

// Your web app's Firebase configuration, allows you to make Firebase CRUD actions to your own instance of Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAaugt3rR1xRgE_XTiwunWjEoQkCn4646I",
  authDomain: "crwn-clothing-db-3066d.firebaseapp.com",
  projectId: "crwn-clothing-db-3066d",
  storageBucket: "crwn-clothing-db-3066d.appspot.com",
  messagingSenderId: "432562820179",
  appId: "1:432562820179:web:25e2f785691da0eecfe2a6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize provider 
const provider = new GoogleAuthProvider();

// tell different ways for this Google auth provider to behave
// everytime someone interacts with provider, always force them to select account
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth(); // create instance of authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore(); // Instantiate firestore/database, directly points to db

export const createUserDocumentFromAuth = async (userAuth) => {
  // give me the document reference
  // inside arg1: database
  // under the arg2: users collection
  // with userAuth unique id. 
  const userDocRef = doc(db, 'users', userAuth.uid); 

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); // retrieve data from document
  console.log(userSnapshot);

  // check if any data does not exist
  if (!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  };

  return userDocRef;
}