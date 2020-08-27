import { ChunkGenerator } from 'svelte-spa-chunk';
import ChunkComponent from 'svelte-spa-chunk/Chunk.svelte';

const applyCodeSplittingToRoute = ChunkGenerator(ChunkComponent);

// route components, loaded async thanks to svelte-spa-chunk
const AboutRoute = applyCodeSplittingToRoute(() => import('components/content/about/About.svelte'));
const DevtrackerRoute = applyCodeSplittingToRoute(() => import('components/content/devtracker/Devtracker.svelte'));
const InfohubRoute = applyCodeSplittingToRoute(() => import('components/content/infohub/Infohub.svelte'));

export {
  AboutRoute, DevtrackerRoute, InfohubRoute,
};
