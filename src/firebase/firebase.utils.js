import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBss_ez2L9NsxC1pUDaDWCEbZPytATUXjI',
  authDomain: 'my-closet-2d234.firebaseapp.com',
  databaseURL: 'https://my-closet-2d234.firebaseio.com',
  projectId: 'my-closet-2d234',
  storageBucket: 'my-closet-2d234.appspot.com',
  messagingSenderId: '148132441286',
  appId: '1:148132441286:web:97ca179a6c6df35bcdbbc7',
  measurementId: 'G-RDXEZGCR89',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
