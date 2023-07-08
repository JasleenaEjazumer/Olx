import "firebase/auth";
import firebase from 'firebase';
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyA3JHj1kqeJvdAB49SJgDzAZElDiak3FAc",
  authDomain: "olx-new-a3d9e.firebaseapp.com",
  projectId: "olx-new-a3d9e",
  storageBucket: "olx-new-a3d9e.appspot.com",
  messagingSenderId: "697793077522",
  appId: "1:697793077522:web:b06f915164e405860f53cb",
  measurementId: "G-0TYB82LXH0"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

