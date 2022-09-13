<script>
import {
  localize, routerLocalizedPush, getLocalizedRoute, routerActive,
} from 'utils/imports/core';
import { currentRouteLocation } from 'utils/imports/store';
import { Icon } from 'utils/imports/components';

export let id;
export let mobile = false;
export let icon;
export let textLocaleKey;
export let linkType = 'external';
export let link;
export let condensed = false;
export let flexAuto = true;

const mobileClasses = 'flex lg:hidden h-full items-center cursor-pointer hover:bg-black hover:text-nwoun pl-2 pr-2';
const desktopClasses = 'hidden lg:flex justify-start h-full items-center cursor-pointer hover:bg-black hover:text-nwoun pl-2 pr-2';
const condensedClasses = 'hover:rounded-full';

function linkClick() {
  if (linkType === 'external') {
    window.open(link);
  }

  if (linkType === 'internal' && $currentRouteLocation !== getLocalizedRoute(link)) {
    routerLocalizedPush(link);
  }
}
</script>

<style lang="scss">
  .menu-item.active {
    @apply bg-black text-nwoun;

    &.condensed {
      @apply rounded-full;
    }
  }

</style>

<div id="{id}" class:flex-auto="{flexAuto}" class:active="{$currentRouteLocation === getLocalizedRoute(link)}" class:condensed="{condensed}" class="{mobile ? mobileClasses : desktopClasses} {condensed ? condensedClasses : ''} menu-item" on:click="{linkClick}">
    <Icon data={icon} scale="1.5" class="w-8"></Icon>
    {#if !condensed}<span class="ml-2 text-xl font-bold">{$localize(textLocaleKey)}</span>{/if}
</div>