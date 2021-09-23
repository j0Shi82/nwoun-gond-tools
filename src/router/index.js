import { routeWrapper, getLocalizedRoute, getRouteGuards } from 'utils/imports/core';
import { localeStandardLanguage, localeSupportedLanguages } from 'utils/imports/config';
import baseRoutes from 'router/baseRoutes';

const routes = {};

// add routes with lang param
localeSupportedLanguages.filter((lang) => lang !== localeStandardLanguage).forEach((lang) => {
  Object.assign(routes, baseRoutes.reduce((prev, cur) => {
    const p = prev;
    p[getLocalizedRoute(cur.name, lang)] = routeWrapper({
      component: cur.component,
      userData: { lang, routeName: cur.name, ...cur.data },
      conditions: [...getRouteGuards(cur.name)],
    });
    return p;
  }, {}));
});

Object.assign(routes, baseRoutes.reduce((prev, cur) => {
  const p = prev;
  p[getLocalizedRoute(cur.name, localeStandardLanguage)] = routeWrapper({
    component: cur.component,
    userData: { lang: localeStandardLanguage, routeName: cur.name, ...cur.data },
    conditions: [...getRouteGuards(cur.name)],
  });
  return p;
}, {}));

export default routes;
