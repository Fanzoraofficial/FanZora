import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDN58IF86qVsRr53v62suaaLyrHvpUnkrA",
  authDomain: "fanzora-1e1a2.firebaseapp.com",
  projectId: "fanzora-1e1a2",
  storageBucket: "fanzora-1e1a2.firebasestorage.app",
  messagingSenderId: "682937115095",
  appId: "1:682937115095:web:7359953705d24f81c7eb92",
  measurementId: "G-CP0W2D5VC2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
