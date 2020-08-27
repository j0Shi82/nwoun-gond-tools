import {
  AboutRoute, DevtrackerRoute, InfohubRoute,
} from 'utils/imports/routes';

const baseRoutes = [
  { name: 'about', component: AboutRoute, data: {} },
  { name: 'devtracker', component: DevtrackerRoute, data: {} },
  { name: 'infohub', component: InfohubRoute, data: {} },
];

export default baseRoutes;
