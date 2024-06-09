import { ChunkGenerator } from "svelte-spa-chunk";
import ChunkComponent from "svelte-spa-chunk/Chunk.svelte";

const applyCodeSplittingToRoute = ChunkGenerator(ChunkComponent);

const SupportRoute = applyCodeSplittingToRoute(
    () => import("@/components/content/support/Support.svelte"),
);
const DevtrackerRoute = applyCodeSplittingToRoute(
    () => import("@/components/content/devtracker/Devtracker.svelte"),
);
const InfohubRoute = applyCodeSplittingToRoute(
    () => import("@/components/content/infohub/Infohub.svelte"),
);
const AuctionDataRoute = applyCodeSplittingToRoute(
    () => import("@/components/content/auction/AuctionData.svelte"),
);
const NotFound = applyCodeSplittingToRoute(
    () => import("@/components/content/404.svelte"),
);

export {
    AuctionDataRoute,
    DevtrackerRoute,
    InfohubRoute,
    NotFound,
    SupportRoute,
};
