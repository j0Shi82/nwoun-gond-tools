<script>
import {
  isLocalizationLoading, setupLocalization, RouterComponent, routes, routerOnRouteLoaded,
} from 'utils/imports/core';
import { svelteLifecycleOnMount, svelteTransitionScale } from 'utils/imports/svelte';
import backgroundImage from 'assets/media/images/NW_M14_Artwork.jpg';
import headerBanner from 'assets/media/images/nwunlogo.png';
import headerBannerSmall from 'assets/media/images/nwunlogo-small.png';

import { faWordpress, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faHashtag, faBars } from '@fortawesome/free-solid-svg-icons';
import FaIcon from 'svelte-fa';

import 'assets/style/tailwind.scss';
import 'assets/style/global.scss';

let showSmallLogo = false;
let menuOpen = false;

setupLocalization();

svelteLifecycleOnMount(() => {
  const listener = () => {
    showSmallLogo = window.scrollY > 144;
  };

  window.addEventListener('scroll', listener);

  return () => {
    window.removeEventListener('scroll', listener);
  };
});
</script>

<style lang="scss">
  #background {
    @apply w-full h-auto min-h-full fixed top-0 left-0 z-0 opacity-25 object-left object-cover;
  }

  #main-content {
    @apply relative z-10 mt-0 mr-auto mb-0 ml-auto max-w-screen-xl;
  }

  #sticky {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.75);
  }

</style>
    
{#if !$isLocalizationLoading}
<img src="{backgroundImage}" id="background">
<main class="main-content" id="main-content">
    <div id="header" class="flex flex-col lg:flex-row justify-center items-center lg:justify-start p-2">
      <img src="{headerBanner}" id="headerBanner" class="h-16 md:h-32" />
      <div id="subtitle" class="text-center w-full text-sm md:text-lg lg:text-2xl">Neverwinteer's #1 independent news source and community from 2015 - 2019!</div>
    </div>
    <div id="sticky" class="sticky z-20 top-0 bg-red-700">
      <div id="mainMenu" class=" flex justify-between w-full h-12 ">
        <div style="width: 150px;">
          {#if showSmallLogo}
            <img transition:svelteTransitionScale="{{ duration: 500 }}" src="{headerBannerSmall}" class="h-full w-auto" />
          {/if}
        </div>
        <div id="blogLink" class="hidden md:flex justify-center h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2 flex-auto">
          <FaIcon icon={faWordpress} class="text-2xl"></FaIcon>
          <span class="ml-2 text-xl font-bold">UN:Blogged</span>
        </div>
        <div id="discordLink" class="hidden md:flex justify-center h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2 flex-auto">
          <FaIcon icon={faDiscord} class="text-2xl"></FaIcon>
          <span class="ml-2 text-xl font-bold">Discord</span>
        </div>
        <div id="boardLink" class="hidden md:flex justify-center h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2 flex-auto">
          <FaIcon icon={faEdit} class="text-2xl"></FaIcon>
          <span class="ml-2 text-xl font-bold">Message Board</span>
        </div>
        <div id="boardLink" class="hidden md:flex justify-center h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2 flex-auto">
          <FaIcon icon={faHashtag} class="text-2xl"></FaIcon>
          <span class="ml-2 text-xl font-bold">DevTracker</span>
        </div>
        <div class="flex md:hidden text-2xl justify-end h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2 flex-0" on:click="{() => { menuOpen = !menuOpen; }}">
          <FaIcon icon={faBars} class="text-2xl"></FaIcon>
        </div>
      </div>
      <div id="mobileMenu" class="p-2" class:hidden="{!menuOpen}" class:flex="{menuOpen}"></div>
    </div>
    {menuOpen}
    <RouterComponent {routes} on:routeLoaded="{routerOnRouteLoaded}" />
</main>
{/if}