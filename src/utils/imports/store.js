// store stuff
import store from 'store/index';
import setRouterIsRouting from 'store/app/setter';
import { location, querystring } from 'svelte-spa-router';

import { locale, locales } from 'svelte-i18n';

const { routeName, isRouting } = store.app.router;
const { avatars } = store.devtracker;
const { firstloadError } = store.infohub;
const { bgOverlay } = store.app;

export {
  setRouterIsRouting as storeSetRouterIsRouting,
  routeName as currentRouteName,
  location as currentRouteLocation,
  querystring as currentRouteQuerystring,
  isRouting as isRoutingInProgress,
  locale as currentLocale,
  locales,
  avatars as devtrackerAvatarList,
  firstloadError as infohubFirstloadError,
  bgOverlay as appBackgroundOverlayActive,
};
