if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/LOCAL/src/service-worker.js")

        .then((registration) => {
            console.log(" Successfully registered Service Worker", registration);
        })
        .catch((error) => {
            console.log("Registration failed Service Worker:", error);
        });
}