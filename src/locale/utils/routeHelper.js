import { currentLocale } from 'utils/imports/store';
import { routeLocaleDict } from 'utils/imports/data';
import { localeStandardLanguage } from 'utils/imports/config';
import { parse, inject } from 'regexparam';

let localeStoreValue;

currentLocale.subscribe((value) => {
  localeStoreValue = value;
});

export const getLocalizedRoute = (routeName, options = {}, lang = localeStoreValue) => {
  const o = {
    routeIndex: 0,
    params: {},
    ...options,
  };

  const route = routeLocaleDict[lang][routeName];
  if (typeof route === 'object') {
    return inject(route.routes[o.routeIndex], o.params);
  }
  return route;
};

const getLocalizedRouteMatcher = (routeName, lang = localeStoreValue) => {
  let routePath;
  const route = routeLocaleDict[lang][routeName];
  if (typeof route === 'object') {
    routePath = route.matcher;
  } else {
    routePath = route;
  }

  if (lang !== localeStandardLanguage) {
    routePath = `/${lang}${routePath}`;
  }
  return routePath;
};

export default getLocalizedRouteMatcher;
