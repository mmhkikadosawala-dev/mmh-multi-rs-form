export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL || ''}/service-worker.js`;
      fetch(swUrl).then(response => {
        if (response.status === 404 || response.headers.get('content-type')?.indexOf('javascript') === -1) {
          // No service worker or wrong MIME type, unregister existing if any
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
          });
          return;
        }
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registered: ', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed: ', error);
          });
      });
    });
  }
}
