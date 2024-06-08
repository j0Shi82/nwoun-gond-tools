import { localeSupportedLanguages } from "@/utils/imports/config";
import { currentLocale } from "@/utils/imports/store";

export default (detail) => {
    if (
        detail.userData &&
        detail.userData.lang &&
        localeSupportedLanguages.includes(detail.userData.lang)
    ) {
        currentLocale.set(detail.userData.lang);
    }
    return true;
};
