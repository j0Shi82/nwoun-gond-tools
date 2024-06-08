import {
    localeStandardLanguage,
    localeSupportedLanguages,
} from "@/utils/imports/config";
import { init, register } from "svelte-i18n";

export default () => {
    localeSupportedLanguages.forEach((lang) => {
        // need to disable prefer-template here because of a bug in babel
        // https://github.com/babel/babel/issues/11844
        // eslint-disable-next-line prefer-template
        register(lang, () => import(`./dict/${lang}.json`));
    });

    init({
        fallbackLocale: "en",
        initialLocale: localeStandardLanguage,
    });
};
