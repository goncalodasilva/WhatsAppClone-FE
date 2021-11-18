import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAqwQ9ecLv_VFXSrGpJmGYMXyoXP2uXyrc",
  authDomain: "whatsapp-mern-74fe7.firebaseapp.com",
  projectId: "whatsapp-mern-74fe7",
  storageBucket: "whatsapp-mern-74fe7.appspot.com",
  messagingSenderId: "646519100370",
  appId: "1:646519100370:web:fb743029075c73faa6ee0b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
//const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
//export default db;