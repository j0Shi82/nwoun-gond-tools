<script>
import { localize, routerPush, getLocalizedRoute } from 'utils/imports/core';
import { Icon } from 'utils/imports/components';

export let id;
export let mobile = false;
export let icon;
export let textLocaleKey;
export let linkType = 'external';
export let link;
export let condensed = false;
export let flexAuto = true;

const mobileClasses = 'flex h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2';
const desktopClasses = 'hidden md:flex justify-center h-full items-center cursor-pointer hover:bg-black hover:text-red-700 pl-2 pr-2';

function linkClick() {
  if (linkType === 'external') {
    window.open(link);
  }

  if (linkType === 'internal') {
    routerPush(getLocalizedRoute(link));
  }
}
</script>

<div id="{id}" class:flex-auto="{flexAuto}" class="{mobile ? mobileClasses : desktopClasses}" on:click="{linkClick}">
    <Icon icon={icon} class="text-2xl{mobile ? ' w-8' : ''}"></Icon>
    {#if !condensed}<span class="ml-2 text-xl font-bold">{$localize(textLocaleKey)}</span>{/if}
</div>