<script>
import {
  isLocalizationLoading, setupLocalization, RouterComponent, routes, routerOnRouteLoaded, localize, routerPush, getLocalizedRoute,
} from 'utils/imports/core';
import { svelteLifecycleOnMount, svelteTransitionScale } from 'utils/imports/svelte';
import { menuItems, images } from 'utils/imports/data';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Icon, MenuItem } from 'utils/imports/components';

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

function goHome() {
  routerPush(getLocalizedRoute('home'));
}
</script>

<style lang="scss">
  #background {
    @apply w-full h-auto min-h-full fixed top-0 left-0 z-0 opacity-25 object-left object-cover;
  }

  #page-wrapper {
    @apply relative z-10 mt-0 mr-auto mb-0 ml-auto max-w-screen-xl;
  }

  #main-content {
    @apply p-2;
  }

  #sticky {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.75);
  }

</style>
    
{#if !$isLocalizationLoading}
<img src="{images.backgroundImage}" id="background" alt="Showing a vmapire" />
<div id="page-wrapper">
  <div id="header" class="flex flex-col lg:flex-row justify-center items-center lg:justify-start p-2">
    <img src="{images.headerBanner}" id="headerBanner" class="h-16 md:h-32 cursor-pointer" alt="logo of Neverwinter Uncensored" on:click="{goHome}" />
    <div id="subtitle" class="text-center w-full text-sm md:text-lg lg:text-2xl">{$localize('header.subtitle')}</div>
  </div>
  <div id="sticky" class="sticky z-20 top-0 bg-nwoun">
    <div id="mainMenu" class=" flex justify-between w-full h-12 ">
      <div style="width: 150px;" class="py-2 ml-2">
        {#if showSmallLogo}
          <img transition:svelteTransitionScale="{{ duration: 500 }}" src="{images.headerBanner}" class="h-full w-auto cursor-pointer" on:click="{goHome}" alt="small logo of Neverwinter Uncensored" />
        {/if}
      </div>
      {#each menuItems.filter((i) => i.type !== 'talk') as item}
        <MenuItem 
          id="{item.id}"
          mobile="{false}"
          icon="{item.icon}"
          textLocaleKey="{item.textLocaleKey}"
          linkType="{item.external ? 'external' : 'internal'}"
          link="{item.link}"
        />
      {/each}
      <div id="menu-talk" class="flex-none flex">
        {#each menuItems.filter((i) => i.type === 'talk') as item}
        <MenuItem 
          id="{item.id}"
          condensed
          mobile="{false}"
          flexAuto="{false}"
          icon="{item.icon}"
          textLocaleKey="{item.textLocaleKey}"
          linkType="{item.external ? 'external' : 'internal'}"
          link="{item.link}"
        />
        <MenuItem 
        id="{`${item.id}Mobile`}"
          condensed
          mobile="{true}"
          flexAuto="{false}"
          icon="{item.icon}"
          textLocaleKey="{item.textLocaleKey}"
          linkType="{item.external ? 'external' : 'internal'}"
          link="{item.link}"
        />
      {/each}
      </div>
      <div class="flex md:hidden text-2xl justify-end h-full items-center cursor-pointer hover:bg-black hover:text-nwoun pl-2 pr-2 flex-0" on:click="{() => { menuOpen = !menuOpen; }}">
        <Icon icon={faBars} class="text-2xl"></Icon>
      </div>
    </div>
    <div id="mobileMenu" class="p-2 flex-col border-black border-t-2 border-solid" class:hidden="{!menuOpen}" class:flex="{menuOpen}">
      {#each menuItems.filter((i) => i.type !== 'talk') as item}
        <MenuItem 
          id="{`${item.id}Mobile`}"
          mobile="{true}"
          icon="{item.icon}"
          textLocaleKey="{item.textLocaleKey}"
          linkType="{item.external ? 'external' : 'internal'}"
          link="{item.link}"
        />
      {/each}
    </div>
  </div>
  <main class="main-content" id="main-content">
    <RouterComponent {routes} on:routeLoaded="{routerOnRouteLoaded}" />
  </main>
</div>
{/if}