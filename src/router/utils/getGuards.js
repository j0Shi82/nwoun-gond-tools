// guards
import setIsLoadingTrue from 'router/guards/setIsLoadingTrue';
import setLocale from 'router/guards/setLocale';
import whoami from 'router/guards/whoami';

const guardConfig = [
  { test: () => true, guards: [setLocale, setIsLoadingTrue] },
  { test: (routeName) => routeName === 'notfound', guards: [whoami] },
];

export default (routeName) => {
  const guards = [];
  guardConfig.forEach((config) => {
    if (config.test(routeName)) guards.push(...config.guards);
  });
  return guards;
};
