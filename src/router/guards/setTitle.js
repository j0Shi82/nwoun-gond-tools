import { currentRouteTitleKey } from 'utils/imports/store';

export default (detail) => {
  if (
    detail.userData
    && detail.userData.routeName
  ) {
    console.log(detail);
    currentRouteTitleKey.set(`routes.titles.${detail.userData.routeName}`);
  }
  return true;
};
