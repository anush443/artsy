import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUwcgyUlsFvpoy-kdP5KZgrIkq1_bmyR8",
  authDomain: "artsy-cbdfd.firebaseapp.com",
  projectId: "artsy-cbdfd",
  storageBucket: "artsy-cbdfd.appspot.com",
  messagingSenderId: "637158159066",
  appId: "1:637158159066:web:3bbcd128127cb332b82be3",
  measurementId: "G-ZTDZ9EGK9T",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
