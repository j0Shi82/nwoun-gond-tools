import {
  HomeRoute, DevtrackerRoute,
} from 'utils/imports/routes';

const baseRoutes = [
  { name: 'home', component: HomeRoute, data: {} },
  { name: 'devtracker', component: DevtrackerRoute, data: {} },
];

export default baseRoutes;
