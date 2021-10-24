// routing
import getLocalizedRoute from 'locale/utils/routeHelper';
import getGuards from 'router/utils/getGuards';
import Router, { push } from 'svelte-spa-router';
import active from 'svelte-spa-router/active';
import { wrap } from 'svelte-spa-router/wrap';
import routes from 'router/index';
import routeLoaded from 'router/routeLoaded';
import Loadable from 'svelte-loadable';

// locale
import {
  _, register, init, date, isLoading, time,
} from 'svelte-i18n';
import setupLocalization from 'locale/i18n';

// plugins
import axios from 'axios';
import * as animateScroll from 'svelte-scrollto';

const instance = axios.create({
  timeout: 5000,
});

export {
  getLocalizedRoute,
  getGuards as getRouteGuards,
  Router as RouterComponent,
  routes,
  routeLoaded as routerOnRouteLoaded,
  active as routerActive,
  push as routerPush,
  wrap as routeWrapper,
  _ as localize,
  date as formatDate,
  instance as axios,
  time as formatTime,
  register as registerLocaleDict,
  init as initLocalization,
  isLoading as isLocalizationLoading,
  setupLocalization,
  animateScroll,
  Loadable as AsyncComponentLoader,
};
