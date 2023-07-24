// Import the functions you need from the SDKs you need
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Gyu9AcrLnG4sp-OAQJH60mCPmWK-qZ0",
  authDomain: "money-tracker-7cf0b.firebaseapp.com",
  projectId: "money-tracker-7cf0b",
  storageBucket: "money-tracker-7cf0b.appspot.com",
  messagingSenderId: "641277509705",
  appId: "1:641277509705:web:633959dc2eb08890ffbf98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app)
const auth = getAuth(app);

export {app, db, auth};