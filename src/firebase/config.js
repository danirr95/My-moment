// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWsMak-nhKnCP0icwzlvMv0EsiphckMnk",
  authDomain: "journal-app-react-497ba.firebaseapp.com",
  projectId: "journal-app-react-497ba",
  storageBucket: "journal-app-react-497ba.appspot.com",
  messagingSenderId: "420150485660",
  appId: "1:420150485660:web:18f16f1265974701214359"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
//Almacenamos y exportamos la constante 'FirebaseAuth' la cual contiene la función que Returns the Auth instance associated with the provided @firebase/app#FirebaseApp @ Recibe por argumento nuestra app de firebase inicializada
export const FirebaseAuth = getAuth( FirebaseApp );
//Almacenamos y exportamos la constante 'FirebaseDB' la cual contiene la función que Returns the existing default Firestore instance that is associated with the provided @firebase/app#FirebaseApp
export const FirebaseDB   = getFirestore( FirebaseApp );