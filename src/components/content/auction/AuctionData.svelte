<script>
import {
  faGem, faTimesCircle, faPlus, faMinus, faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import faSearch from 'assets/media/fontawesome/search.svg';

import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import {
  Spinner, Icon, Button, StandardError,
} from 'utils/imports/components';
import {
  localize, routerLocalizedPush,
} from 'utils/imports/core';
import { currentRouteQuerystring } from 'utils/imports/store';
import { dateFormatRelative, buildQueryStrings, makeApiCall } from 'utils/imports/helpers';
import { getAuctionChart } from 'utils/imports/plugins';

import 'assets/style/tagify.scss';

const qs = new URLSearchParams($currentRouteQuerystring);
const charts = {};
const chartData = {};
let loading = true;
let error = false;
let itemData = [];
let filteredData = [];
let searchElement = null;
let searchText = '';
let catElement = null;
let categories = [];
let openItemDef = null;
let curPage = 0;
let curResultsCount = 0;

function getDetailData(itemDef) {
  if (chartData[itemDef]) return Promise.resolve({ data: chartData[itemDef] });
  return makeApiCall({ type: 'auctions/itemdetails', params: { itemDef }, returnData: false });
}

function toggle(itemDef) {
  if (typeof charts[openItemDef] !== 'undefined') {
    charts[openItemDef].destroy();
    charts[openItemDef] = undefined;
  }
  if (chartData[itemDef] === false) {
    chartData[itemDef] = undefined;
  }
  if (openItemDef === itemDef) {
    openItemDef = null;
  } else {
    openItemDef = itemDef;
    if (typeof charts[openItemDef] === 'undefined') {
      getDetailData(itemDef).then(({ data: detailData }) => {
        chartData[itemDef] = detailData;
        charts[openItemDef] = getAuctionChart(`Chart_${openItemDef}`, detailData);
        charts[openItemDef].resize();
      }).catch(() => {
        chartData[itemDef] = false;
      });
    }
  }
}

function searchChange(page = 0) {
  if (openItemDef !== null) toggle(openItemDef);
  curPage = page;
  routerLocalizedPush('auction', buildQueryStrings([
    {
      element: searchElement, type: 'innerText', comp: searchElement.innerText.length > 2, name: 's',
    },
    {
      element: catElement, type: 'attrValue', comp: catElement.value !== '', name: 'cat',
    },
  ]));
  filteredData = itemData.filter(
    (el) => (searchElement.innerText.length < 3 || RegExp(searchElement.innerText, 'i').test(el.ItemName))
      && (catElement.value === '' || (el.Categories && el.Categories.includes(catElement.value))),
  ).filter((el, i) => i >= curPage * 10 && i < 10 * (curPage + 1));
  curResultsCount = itemData.filter(
    (el) => (searchElement.innerText.length < 3 || RegExp(searchElement.innerText, 'i').test(el.ItemName))
      && (catElement.value === '' || (el.Categories && el.Categories.includes(catElement.value))),
  ).length;

  searchText = searchElement.innerText;
}

function searchReset() {
  if (openItemDef !== null) toggle(openItemDef);
  searchElement.innerText = '';
  searchText = searchElement.innerText;
  searchChange();
}

function getItemData() {
  loading = true;
  makeApiCall({ type: 'auctions/items', returnData: false })
    .then((response) => {
      itemData = response.data;
      categories = itemData.reduce((aggr, cur) => {
        if (!cur.Categories) return aggr;
        cur.Categories.forEach((el) => {
          if (!aggr.includes(el)) aggr.push(el);
        });
        return aggr;
      }, []);
      filteredData = itemData.filter(
        (el) => (qs.get('s') === null || RegExp(qs.get('s'), 'i').test(el.ItemName))
      && (qs.get('cat') === null || (el.Categories && el.Categories.includes(qs.get('cat')))),
      ).filter((el, i) => i >= curPage * 10 && i < 10 * (curPage + 1));
      curResultsCount = itemData.length;
    })
    .catch(() => {
      error = true;
    })
    .finally(() => {
      loading = false;
    });
}

svelteLifecycleOnMount(() => {
  getItemData();
});
</script>

{#if error}
  <StandardError />
{:else}
  <div class="flex justify-between items-center mb-2">
    <div id="search" class="auction-tagify flex flex-grow mr-2">
      <span style="background-image: url({faSearch});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10 mr-1" id="filter"></span>
      <tags class="tagify tagify--noTags tagify--empty" tabindex="-1" aria-expanded="false">
        <span contenteditable="" bind:this={searchElement} on:input={() => searchChange(0) } tabindex="0" data-placeholder="Search" aria-placeholder="Search" class="tagify__input" role="textbox" aria-autocomplete="both" aria-multiline="false">{ qs.get('s') ? qs.get('s') : '' }</span>
        <div class="cursor-pointer right-1 top-1 absolute" on:click={searchReset} class:invisible={searchText.length < 3}>
          <Icon data="{faTimesCircle}" scale="{2}" class="text-black"></Icon>
        </div>
      </tags>
    </div>
    <div>
      <select on:change={() => searchChange(0)} bind:this={catElement} class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" id="grid-state" style="max-width: 160px; width: 160px">
        <option value="">-- Category --</option>
        {#each categories as cat}
          <option selected={ qs.get('cat') === cat ? 'selected' : ''}>{cat}</option>
        {/each}
      </select>
    </div>
  </div>
  {#if !loading}
  <div class="flex flex-col">
    <div>
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden bg-red-700 border-black border-2 rounded-md">
          <table class="min-w-full divide-y divide-black">
            <thead class="bg-red-700">
              <tr>
                <th scope="col" class="px-1 py-3 text-left font-bold text-lg uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" class="px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Price
                </th>
                <th scope="col" class="hidden md:table-cell px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Count
                </th>
                <th scope="col" class="hidden md:table-cell px-1 py-3 font-bold text-lg uppercase tracking-wider text-right">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody class="bg-red-700 divide-y divide-black">
              {#each filteredData as data, i}
              <tr id={data.ItemDef} class="item-row {data.Quality}">
                <td class="px-1 py-1 truncate item-name">
                  <div class="cursor-pointer w-4 inline-block mr-1" on:click={toggle(data.ItemDef)}>
                    {#if openItemDef === data.ItemDef}
                      <Icon data={faMinus} scale="1.5" class="text-black"></Icon>
                    {:else}
                      <Icon data={faPlus} scale="1.5" class="text-black"></Icon>
                    {/if}
                  </div>
                  {data.ItemName}
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right item-price">
                  {Intl.NumberFormat().format(data.Low)} <Icon data={faGem} scale="1.5" class="text-black"></Icon>
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell item-count">
                  {Intl.NumberFormat().format(data.Count)}
                </td>
                <td class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell item-date">
                  {dateFormatRelative(new Date(data.Inserted * 1000), new Date())}
                </td>
              </tr>
              <tr class="item-row {data.Quality}" class:hidden={openItemDef !== data.ItemDef}>
                <td colspan="5" class="relative">
                  {#if chartData[openItemDef] === false}
                  <div class="absolute top-0 left-0 w-full p-2 rounded-md font-bold flex justify-center items-center" style="height: 400px">
                    <Icon data="{faExclamationTriangle}" scale="{2}" class="text-nwoun flex-shrink-0 pr-2"></Icon>
                    <span class="text-nwoun">{$localize('errors.catError')}</span>
                  </div>
                  {:else if typeof charts[openItemDef] === 'undefined'}
                    <Spinner style="position: absolute; height: 400px;" />
                  {/if}
                  <div style="position: relative; height: 400px;" class="flex justify-center items-center">
                    <canvas id={`Chart_${data.ItemDef}`} class:hidden={charts[openItemDef] === 'undefined'}></canvas>
                  </div>
                  <div ></div>
                </td>
              </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div id="pages" class="my-2 flex justify-between">
    <Button text="&lt;&lt; Prev" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" invisible="{curPage < 1}" click="{() => { if (openItemDef !== null) toggle(openItemDef); searchChange(curPage -= 1); }}" />
      {#if curResultsCount > (10 * (curPage + 1))}<Button text="Next &gt;&gt;" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" click="{() => { if (openItemDef !== null) toggle(openItemDef); searchChange(curPage += 1); }}" />{/if}
  </div>
  {:else}
  <Spinner />
  {/if}
{/if}

<style lang="scss">
.item-row {
  .item-name {
    @apply font-bold;
  }

  &.White,
  &.Common {
    @apply bg-gray-100;
  }

  &.Green,
  &.Uncommon {
    @apply bg-green-600;
  }

  &.Blue,
  &.Rare {
    @apply bg-blue-600;
  }

  &.Purple,
  &.Epic {
    @apply bg-purple-600;
  }

  &.Orange,
  &.Legendary {
    @apply bg-yellow-600;
  }

  &.Mythic,
  &.Teal {
    background-color: cyan;
  }
}

td {
  &.truncate {
    max-width: calc(85vw - 125px);

    @screen md {
      max-width: calc(85vw - 125px - 80px - 235px);
    }
  }

  &.item-price {
    width: 125px;
    min-width: 125px;
    max-width: 125px;
  }

  &.item-count {
    width: 80px;
    min-width: 80px;
    max-width: 80px;
  }

  &.item-date {
    width: 235px;
    min-width: 235px;
    max-width: 235px;
  }
}

canvas {
  max-height: 400px !important;
}

</style>