<script>
import {
  isLocalizationLoading, setupLocalization, RouterComponent, routes, routerOnRouteLoaded,
} from 'utils/imports/core';
import backgroundImage from 'assets/media/images/NW_M14_Artwork.jpg';
import headerBanner from 'assets/media/images/nwunlogo.png';
import headerBannerSmall from 'assets/media/images/nwunlogo-small.png';

import 'assets/style/tailwind.scss';
import 'assets/style/global.scss';

setupLocalization();
</script>

<style lang="scss">
  #background {
    @apply w-full h-auto min-h-full fixed top-0 left-0 z-0 opacity-25 object-left object-cover;
  }

  #main-content {
    @apply relative z-10 mt-0 mr-auto mb-0 ml-auto max-w-screen-xl;
  }

  #sticky {
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.75);
  }

</style>
    
{#if !$isLocalizationLoading}
<img src="{backgroundImage}" id="background">
<main class="main-content" id="main-content">
    <div id="header" class="flex flex-col lg:flex-row justify-center items-center lg:justify-start p-2">
      <img src="{headerBanner}" id="headerBanner" class="h-16 md:h-32" />
      <div id="subtitle" class="text-center w-full text-sm md:text-lg lg:text-2xl">Neverwinteer's #1 independent news source and community from 2015 - 2019!</div>
    </div>
    <div id="sticky" class="sticky flex top-0 w-full bg-red-700 h-12 z-20 p-2">
      <img src="{headerBannerSmall}" class="h-full w-auto" />
    </div>
    <RouterComponent {routes} on:routeLoaded="{routerOnRouteLoaded}" />
</main>
{/if}