import {
  SupportRoute, DevtrackerRoute, InfohubRoute, AuctionDataRoute,
} from 'utils/imports/routes';

const baseRoutes = [
  { name: 'support', component: SupportRoute, data: {} },
  { name: 'devtracker', component: DevtrackerRoute, data: {} },
  { name: 'infohub', component: InfohubRoute, data: {} },
  { name: 'auction', component: AuctionDataRoute, data: {} },
];

export default baseRoutes;
