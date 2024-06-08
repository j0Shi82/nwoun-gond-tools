// store stuff
import setRouterIsRouting from "@/store/app/setter";
import store from "@/store/index";
import { location, querystring } from "svelte-spa-router";

import { locale, locales } from "svelte-i18n";

const { routeName, isRouting, routeTitleKey } = store.app.router;
const { avatars } = store.devtracker;
const { firstloadError, tagId, tags, tagTitle } = store.infohub;
const { bgOverlay } = store.app;

export {
    bgOverlay as appBackgroundOverlayActive,
    locale as currentLocale,
    location as currentRouteLocation,
    routeName as currentRouteName,
    querystring as currentRouteQuerystring,
    routeTitleKey as currentRouteTitleKey,
    avatars as devtrackerAvatarList,
    firstloadError as infohubFirstloadError,
    tags as infohubTags,
    tagId as infohubWhoamiTagId,
    tagTitle as infohubWhoamiTagTitle,
    isRouting as isRoutingInProgress,
    locales,
    setRouterIsRouting as storeSetRouterIsRouting,
};
