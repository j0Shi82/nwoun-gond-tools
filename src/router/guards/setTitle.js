import { currentRouteTitleKey } from 'utils/imports/store';

export default (detail) => {
  if (
    detail.userData
    && detail.userData.routeName
  ) {
    currentRouteTitleKey.set(`routes.titles.${detail.userData.routeName}`);
  }
  return true;
};
