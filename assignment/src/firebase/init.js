// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore" ;

// Your web app's Firebase configuration
const firebaseConfig = {
  /** put your firebase config here **/
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()

export default db 

