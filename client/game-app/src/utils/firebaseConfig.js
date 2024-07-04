import firebase from "firebase/compat/app";

// Configuration for Firebase
const firebaseConfig = {
    // The API key for the project
    apiKey: import.meta.env.VITE_apiKey,
    // The authentication domain for the project
    authDomain: import.meta.env.VITE_authDomain,
    // The project ID
    projectId: import.meta.env.VITE_projectId,
    // The storage bucket for the project
    storageBucket: import.meta.env.VITE_storageBucket,
    // The messaging sender ID
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // The app ID
    appId: import.meta.env.VITE_appId,
};

// Initialize Firebase with the configuration
const app = firebase.initializeApp(firebaseConfig);

// Export the Firebase app instance
export default app;
