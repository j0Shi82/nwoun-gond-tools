import { ChunkGenerator } from 'svelte-spa-chunk';
import ChunkComponent from 'svelte-spa-chunk/Chunk.svelte';

const applyCodeSplittingToRoute = ChunkGenerator(ChunkComponent);

// route components, loaded async thanks to svelte-spa-chunk
const HomeRoute = applyCodeSplittingToRoute(() => import('components/content/home/Home.svelte'));
const DevtrackerRoute = applyCodeSplittingToRoute(() => import('components/content/devtracker/Devtracker.svelte'));
const InfohubRoute = applyCodeSplittingToRoute(() => import('components/content/infohub/Infohub.svelte'));

export {
  HomeRoute, DevtrackerRoute, InfohubRoute,
};
