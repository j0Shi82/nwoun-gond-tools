<script>
import {
  isLocalizationLoading, setupLocalization, RouterComponent, routes, routerOnRouteLoaded,
} from 'utils/imports/core';
import backgroundImage from 'assets/media/images/NW_M14_Artwork.jpg';
import headerBanner from 'assets/media/images/nwunlogo.png';

import 'assets/style/tailwind.scss';

setupLocalization();
</script>

<style lang="scss">
  #background {
    @apply w-full h-auto min-h-full fixed top-0 left-0 z-0 opacity-25
  }

  #main-content {
    @apply relative z-10 p-2
  }

</style>
    
{#if !$isLocalizationLoading}
<img src="{backgroundImage}" id="background">
<main class="main-content" id="main-content">
    <div id="header" class="flex justify-center lg:justify-start">
      <img src="{headerBanner}" id="headerBanner" class="h-16 md:h-32" />
    </div>
    <RouterComponent {routes} on:routeLoaded="{routerOnRouteLoaded}" />
</main>
{/if}