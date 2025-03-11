if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./src/service-worker.js")

        .then((registration) => {
            console.log("Service Worker مسجل بنجاح:", registration);
        })
        .catch((error) => {
            console.log("فشل تسجيل Service Worker:", error);
        });
}
