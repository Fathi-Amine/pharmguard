import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTSKoZBD7BBkqhbzGa2oWqsjBkuTrCcos",
    authDomain: "pharmguard-5307d.firebaseapp.com",
    projectId: "pharmguard-5307d",
    storageBucket: "pharmguard-5307d.appspot.com",
    messagingSenderId: "603636584721",
    appId: "1:603636584721:web:240d9000b56e3a55d2fcb0",
    measurementId: "G-NQL931JM6R"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }