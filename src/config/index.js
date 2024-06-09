export default {
    app: {
        router: {
            // transition between routes, 0 to disable
            routingFadeDuration: 250,
        },
        locale: {
            supportedLanguages: ["en"],
            standardLanguage: "en",
        },
        // apiServer: 'https://api.uncnso.red',
        apiServer:
            import.meta.env.VITE_NODE_ENV === "production"
                ? "https://api.uncnso.red"
                : "http://localhost:8084",
    },
};
