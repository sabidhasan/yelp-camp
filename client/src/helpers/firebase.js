import firebase from 'firebase';
import config from './firebase-config'

// const config = {
//     apiKey: "AIzaSyD2KYE5ZPxZJal9WgCd88hndV7_goxiaRw",
//     authDomain: "yelp-camp-4ed80.firebaseapp.com",
//     databaseURL: "https://yelp-camp-4ed80.firebaseio.com",
//     projectId: "yelp-camp-4ed80",
//     storageBucket: "yelp-camp-4ed80.appspot.com",
//     messagingSenderId: "159331188116"
// }

// Initialize app if not already initialized (needed for authentication)
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const providers = {
  facebook: facebookProvider,
  google: googleProvider
}
export const auth = firebase.auth();


export const signInFunc = (provider) => {
  return auth.signInWithRedirect(providers[provider]);
}

export const signOutFunc = () => {
  return auth.signOut();
}

export default firebase
