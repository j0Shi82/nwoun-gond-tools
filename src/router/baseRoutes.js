import {
  HomeRoute, DevtrackerRoute, InfohubRoute,
} from 'utils/imports/routes';

const baseRoutes = [
  { name: 'home', component: HomeRoute, data: {} },
  { name: 'devtracker', component: DevtrackerRoute, data: {} },
  { name: 'infohub', component: InfohubRoute, data: {} },
];

export default baseRoutes;
