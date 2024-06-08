import config from "@/config/index";

const { routingFadeDuration } = config.app.router;
const { standardLanguage, supportedLanguages } = config.app.locale;
const { apiServer } = config.app;

export {
    apiServer,
    standardLanguage as localeStandardLanguage,
    supportedLanguages as localeSupportedLanguages,
    routingFadeDuration,
};
