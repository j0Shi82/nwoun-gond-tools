import setIsLoadingFalse from 'router/events/setIsLoadingFalse';
import { currentRouteName } from 'utils/imports/store';

export default (event) => {
  currentRouteName.set(event.detail.userData.routeName);
  setIsLoadingFalse();
  // if (window.scrollY > document.querySelector('#header').offsetHeight) {
  //   window.scrollTo({
  //     behavior: 'smooth',
  //     top: document.querySelector('#header').offsetHeight + 1,
  //     left: 0,
  //   });
  // }
};
