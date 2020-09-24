import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase configuration
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
firebase.initializeApp(config);
// get auth and firestore from firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// configure OAuth with google and display a pop up to select an account
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// get the logged in user info from firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // if the user doesn't exist create a new one
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumlator, collection) => {
    accumlator[collection.title.toLowerCase()] = collection;
    return accumlator;
  }, {});
};

export default firebase;
