<script>
import {
  localize, routerPush, getLocalizedRoute, routerActive,
} from 'utils/imports/core';
import { Icon } from 'utils/imports/components';

export let id;
export let mobile = false;
export let icon;
export let textLocaleKey;
export let linkType = 'external';
export let link;
export let condensed = false;
export let flexAuto = true;

const mobileClasses = 'flex md:hidden h-full items-center cursor-pointer hover:bg-black hover:text-nwoun pl-2 pr-2';
const desktopClasses = 'hidden md:flex justify-start h-full items-center cursor-pointer hover:bg-black hover:text-nwoun pl-2 pr-2';

function linkClick() {
  if (linkType === 'external') {
    window.open(link);
  }

  if (linkType === 'internal') {
    routerPush(getLocalizedRoute(link));
  }
}
</script>

<style lang="scss">
  .menu-item.active {
    @apply bg-black text-nwoun;
  }

</style>

<div id="{id}" class:flex-auto="{flexAuto}" class="{mobile ? mobileClasses : desktopClasses} menu-item" on:click="{linkClick}" use:routerActive={{ path: linkType === 'external' ? '/ext' : getLocalizedRoute(link) }}>
    <Icon data={icon} scale="1.5" class="{mobile ? ' w-8' : ''}"></Icon>
    {#if !condensed}<span class="ml-2 text-xl font-bold">{$localize(textLocaleKey)}</span>{/if}
</div>