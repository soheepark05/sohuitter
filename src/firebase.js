
import firebase from "firebase/compat/app"

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcBsT3TrCMsVGh_C3fet-xORoJLFyquZU",
  authDomain: "sohuitter.firebaseapp.com",
  projectId: "sohuitter",
  storageBucket: "sohuitter.appspot.com",
  messagingSenderId: "87935356890",
  appId: "1:87935356890:web:c7afa3dc9bdf4bceed3ae3"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);



const authService = firebase.auth();

 export default authService;
