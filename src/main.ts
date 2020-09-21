import App from './App.svelte';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/js/sw.js')
        .then(() => console.log('Serviceworker registered.'))
        .catch((err) => console.error(`Serviceworker could not be registered. ${ err }`))
}

const app = new App({
    target: document.body,
    props : {
        debug: false
    }
});

export default app;
