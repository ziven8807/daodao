import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyCNmo862Op7znH3r9GYWmuZ54OGpBuFmwA",
    authDomain: "member-syst.firebaseapp.com",
    projectId: "member-syst",
    storageBucket: "member-syst.appspot.com",
    messagingSenderId: "694123982344",
    appId: "1:694123982344:web:345aa13574b86a04a72bbd",
    measurementId: "G-CCWJ10G9FR"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;