import App                            from './App.svelte';
import firebase                       from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ConfigFactory, Environment } from './config/ConfigFactory';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .catch((err) => console.error(`Serviceworker could not be registered. ${ err }`));
}

// Create app config
const config = ConfigFactory.create(Environment.PROD);

// Init firebase
firebase.initializeApp(config.firebase);

// Init app
const app = new App({
    target: document.body,
    props : { config },
});

export default app;
