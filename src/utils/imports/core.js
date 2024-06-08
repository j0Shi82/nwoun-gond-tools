// routing
import getLocalizedRouteMatcher, {
    getLocalizedRoute,
} from "@/locale/utils/routeHelper";
import routes from "@/router/index";
import routeLoaded from "@/router/routeLoaded";
import Loadable from "svelte-loadable/Loadable.svelte";
import Router, { push } from "svelte-spa-router";
import active from "svelte-spa-router/active";
import { wrap } from "svelte-spa-router/wrap";

// locale
import setupLocalization from "@/locale/i18n";
import { _, date, isLoading, time } from "svelte-i18n";

const routerLocalizedPush = (routeName, options = {}) => {
    const o = {
        queryString: "",
        ...options,
    };
    push(getLocalizedRoute(routeName, options) + o.queryString);
};

export {
    Loadable as AsyncComponentLoader,
    Router as RouterComponent,
    date as formatDate,
    time as formatTime,
    getLocalizedRouteMatcher,
    isLoading as isLocalizationLoading,
    _ as localize,
    wrap as routeWrapper,
    active as routerActive,
    routerLocalizedPush,
    routeLoaded as routerOnRouteLoaded,
    push as routerPush,
    routes,
    setupLocalization,
};
