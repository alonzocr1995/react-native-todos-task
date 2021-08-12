// import * as firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAbgPCAgn3pDJdCE-ChJW4kfMx9xEl0bCk",
//   authDomain: "to-do-react-native-d6549.firebaseapp.com",
//   projectId: "to-do-react-native-d6549",
//   storageBucket: "to-do-react-native-d6549.appspot.com",
//   messagingSenderId: "103199528439",
//   appId: "1:103199528439:web:8ce6f3a2e1422fb09b0af2",
// };

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

// export { db, auth };

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbgPCAgn3pDJdCE-ChJW4kfMx9xEl0bCk",
  authDomain: "to-do-react-native-d6549.firebaseapp.com",
  projectId: "to-do-react-native-d6549",
  storageBucket: "to-do-react-native-d6549.appspot.com",
  messagingSenderId: "103199528439",
  appId: "1:103199528439:web:8ce6f3a2e1422fb09b0af2",
};

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.warn(error);
}

const db = firebase.firestore();
export { db };

// const db = app.firestore();
// const auth = firebase.auth();
