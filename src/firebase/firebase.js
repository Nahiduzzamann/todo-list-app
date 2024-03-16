// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwTy9OkXASKk_yY2rDNGmchT1ptTsUHPU",
  authDomain: "todo-list-app-c7c25.firebaseapp.com",
  projectId: "todo-list-app-c7c25",
  storageBucket: "todo-list-app-c7c25.appspot.com",
  messagingSenderId: "446688095597",
  appId: "1:446688095597:web:7d3ba51f08b6424c31fe64"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };