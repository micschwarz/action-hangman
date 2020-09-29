import App from './App.svelte';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Serviceworker registered.'))
        .catch((err) => console.error(`Serviceworker could not be registered. ${ err }`))
}*/

// Init firebase
const firebaseConfig = {
    apiKey           : "AIzaSyDGAQ-b2mkJCQOm8Zr2oYgktnBkOMbRwEo",
    authDomain       : "action-hangman.firebaseapp.com",
    databaseURL      : "https://action-hangman.firebaseio.com",
    projectId        : "action-hangman",
    storageBucket    : "action-hangman.appspot.com",
    messagingSenderId: "479678107729",
    appId            : "1:479678107729:web:bd72c5e3ded4b7998ee870"
};

firebase.initializeApp(firebaseConfig);

// Init app
const app = new App({
    target: document.body,
});

export default app;
