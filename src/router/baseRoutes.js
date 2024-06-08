import {
    AuctionDataRoute,
    DevtrackerRoute,
    InfohubRoute,
    SupportRoute,
    UserRoute,
} from "@/utils/imports/routes";

const baseRoutes = [
    { name: "user", component: UserRoute, data: {} },
    { name: "support", component: SupportRoute, data: {} },
    { name: "devtracker", component: DevtrackerRoute, data: {} },
    { name: "infohub", component: InfohubRoute, data: {} },
    { name: "auction", component: AuctionDataRoute, data: {} },
];

export default baseRoutes;
