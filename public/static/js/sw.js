self.addEventListener('install', () => {
    console.log('Serviceworker installed.');
});

self.addEventListener('activate', () => {
    console.log('Serviceworker activated.');
});
