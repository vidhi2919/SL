// const app = true; // Mock Firebase for testing
// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWAFYUAY_dRd35RNj3Ibv5mAWk1ObAjE4",
  authDomain: "smartlend-4e7bd.firebaseapp.com",
  projectId: "smartlend-4e7bd",
  storageBucket: "smartlend-4e7bd.appspot.com",
  messagingSenderId: "942888519696",
  appId: "1:942888519696:web:540a148c6edc953a99a295",
  measurementId: "G-RH2737XG2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Debugging: Check if Firebase initialized
console.log("🔥 Firebase Initialized:", app.name);

export { auth, db};
export default app;