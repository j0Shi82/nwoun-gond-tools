// routing
import getLocalizedRouteMatcher, {
    getLocalizedRoute,
} from "locale/utils/routeHelper";
import getGuards from "router/utils/getGuards";
import Router, { push } from "svelte-spa-router";
import active from "svelte-spa-router/active";
import { wrap } from "svelte-spa-router/wrap";
import routes from "router/index";
import routeLoaded from "router/routeLoaded";
import Loadable from "svelte-loadable";

// locale
import { _, register, init, date, isLoading, time } from "svelte-i18n";
import setupLocalization from "locale/i18n";

const routerLocalizedPush = (routeName, options = {}) => {
    const o = {
        queryString: "",
        ...options,
    };
    push(getLocalizedRoute(routeName, options) + o.queryString);
};

export {
    getLocalizedRouteMatcher,
    getGuards as getRouteGuards,
    Router as RouterComponent,
    routes,
    routeLoaded as routerOnRouteLoaded,
    active as routerActive,
    push as routerPush,
    routerLocalizedPush,
    wrap as routeWrapper,
    _ as localize,
    date as formatDate,
    time as formatTime,
    register as registerLocaleDict,
    init as initLocalization,
    isLoading as isLocalizationLoading,
    setupLocalization,
    Loadable as AsyncComponentLoader,
};
