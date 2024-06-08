import baseRoutes from "@/router/baseRoutes";
import getGuards from "@/router/utils/getGuards";
import {
    localeStandardLanguage,
    localeSupportedLanguages,
} from "@/utils/imports/config";
import { getLocalizedRouteMatcher, routeWrapper } from "@/utils/imports/core";
import { NotFound } from "@/utils/imports/routes";

const routes = new Map();

// add routes with lang param
localeSupportedLanguages
    .filter((lang) => lang !== localeStandardLanguage)
    .forEach((lang) => {
        baseRoutes.forEach((route) => {
            routes.set(
                getLocalizedRouteMatcher(route.name, lang),
                routeWrapper({
                    component: route.component,
                    userData: { lang, routeName: route.name, ...route.data },
                    conditions: [...getGuards({ routeName: route.name })],
                }),
            );
        });
    });

baseRoutes.forEach((route) => {
    routes.set(
        getLocalizedRouteMatcher(route.name, localeStandardLanguage),
        routeWrapper({
            component: route.component,
            userData: {
                localeStandardLanguage,
                routeName: route.name,
                ...route.data,
            },
            conditions: [...getGuards({ routeName: route.name })],
        }),
    );
});

routes.set(
    "*",
    routeWrapper({
        component: NotFound,
        userData: { lang: localeStandardLanguage, routeName: "notfound" },
        conditions: [...getGuards({ routeName: "notfound" })],
    }),
);

export default routes;
