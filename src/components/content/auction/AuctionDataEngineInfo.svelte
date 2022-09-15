<script>
import {
  faCircleCheck, faBan,
} from '@fortawesome/free-solid-svg-icons';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Icon } from 'utils/imports/components';
import { localize } from 'utils/imports/core';
import { makeApiCall } from 'utils/imports/helpers';

let crawlEngineData = null;

$: localizeOptions = {
  values: {
    itemsPerDay: parseInt(crawlEngineData?.ItemsPerDay),
    totalItems: parseInt(crawlEngineData?.TotalItems),
    percentage: (parseInt(crawlEngineData?.ItemsPerDay) / parseInt(crawlEngineData?.TotalItems) * 100).toFixed(2),
  },
};

svelteLifecycleOnMount(async () => {
  crawlEngineData = await makeApiCall({
    type: 'auctions/engine',
    returnData: true,
  });
});

const classes = {
  div1: 'p-2 border-2 rounded-lg',
  div2: 'flex items-center justify-center',
  div3: 'text-center font-bold text-lg text-nwoun underline',
};
</script>

{#if crawlEngineData}
<div class="mb-2">
{#if crawlEngineData.IsActive}
<div class="{classes.div1} border-green-700">
    <div class="{classes.div2}">
        <Icon data="{faCircleCheck}" scale="{1}" class="text-green-700 mr-2"></Icon>
        <div>{@html $localize('auction.engine.up.data', localizeOptions)}</div>
    </div>
    <div class="{classes.div3}">
        <a href="https://www.patreon.com/nw_gond_tools" target="_blank">{ $localize('auction.engine.up.help') }</a>
    </div>
</div>
{:else}
<div class="{classes.div1} border-red-700">
    <div class="{classes.div2}">
        <Icon data="{faBan}" scale="{1}" class="text-red-700 mr-2"></Icon>
        <div>{@html $localize('auction.engine.down.data', localizeOptions)}</div>
    </div>
    <div class="{classes.div3}">
        <a href="https://www.patreon.com/nw_gond_tools" target="_blank">{ $localize('auction.engine.down.help') }</a>
    </div>
</div>
{/if}
</div>
{:else}
<div class="{classes.div1} border-gray-700 mb-2">
    <div class="text-center">{ $localize('auction.engine.loading.data') }</div>
    <div class="{classes.div3}">
        <a href="https://www.patreon.com/nw_gond_tools" target="_blank">{ $localize('auction.engine.loading.help') }</a>
    </div>
</div>
{/if}