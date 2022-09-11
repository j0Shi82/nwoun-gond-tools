<script>
import {
  faGem, faTimesCircle, faPlus, faMinus, faExclamationTriangle, faCircleCheck, faBan,
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
import { dateFormat, dateFormatRelative, buildQueryStrings, makeApiCall } from 'utils/imports/helpers';
import { getAuctionChart, Easepick } from 'utils/imports/plugins';

import 'assets/style/tagify.scss';

const qs = new URLSearchParams($currentRouteQuerystring);
const charts = {};
const chartData = {};
let loading = true;
let error = false;
let itemData = [];
let filteredData = [];
let searchElement = null;
let catElement = null;
let qualityElement = null;
let pickerStartElement = null;
let pickerEndElement = null;
let pickerStart = null;
let pickerEnd = null;
let pickerStartDate = qs.get('start') ? new Date(qs.get('start')) : null;
let pickerEndDate = qs.get('end') ? new Date(qs.get('end')) : null;
let categories = [];
let qualities = [];
let openItemDef = qs.get('open') || null;
let curPage = parseInt(qs.get('page')) || 0;
let curCat = qs.get('cat') || '';
let curQuality = qs.get('quality') || '';
let curSearchTerm = qs.get('s') || '';
let curResultsCount = 0;
let crawlEngineData = null;

function updateURLQueryParams() {
  routerLocalizedPush('auction', buildQueryStrings([
    {
      element: searchElement, type: 'innerText', comp: searchElement.innerText.length > 2, name: 's',
    },
    {
      element: catElement, type: 'attrValue', comp: catElement.value !== '', name: 'cat',
    },
    {
      element: qualityElement, type: 'attrValue', comp: qualityElement.value !== '', name: 'quality',
    },
    {
      element: curPage, type: 'value', comp: curPage !== 0, name: 'page',
    },
    {
      element: openItemDef, type: 'value', comp: openItemDef !== null, name: 'open',
    },
    {
      element: dateFormat(pickerStartDate || new Date(), "yyyy-MM-dd"), type: 'value', comp: pickerStartDate !== null, name: 'start',
    },
    {
      element: dateFormat(pickerEndDate || new Date(), "yyyy-MM-dd"), type: 'value', comp: pickerEndDate !== null, name: 'end',
    },
  ]));
}

function getDetailData(itemDef) {
  if (chartData[itemDef]) return Promise.resolve({ data: chartData[itemDef] });
  return makeApiCall({ 
    type: 'auctions/itemdetails', 
    params: { 
      itemDef
    }, 
    returnData: false 
  });
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
        charts[openItemDef] = getAuctionChart(
          `Chart_${openItemDef}`, 
          detailData.filter((el) => (pickerStartDate === null || (new Date(el.InsertedDate) >= pickerStartDate))
            && (pickerEndDate === null || (new Date(el.InsertedDate) <= pickerEndDate))),
          itemData.find((el) => el.ItemDef === itemDef).Quality);
        charts[openItemDef].resize();
      }).catch(() => {
        chartData[itemDef] = false;
      });
    }
  }
  updateURLQueryParams()
}

function searchChange(page = 0) {
  if (openItemDef !== null) toggle(openItemDef);
  curPage = page;
  updateURLQueryParams()
  filteredData = itemData.filter(
    (el) => (curSearchTerm.length < 3 || RegExp(curSearchTerm, 'i').test(el.ItemName))
      && (curCat === '' || (el.Categories && el.Categories.includes(curCat)))
      && (curQuality === '' || (el.Quality && el.Quality === curQuality)),
  ).filter((el, i) => i >= curPage * 10 && i < 10 * (curPage + 1));
  curResultsCount = itemData.filter(
    (el) => (curSearchTerm.length < 3 || RegExp(curSearchTerm, 'i').test(el.ItemName))
      && (curCat === '' || (el.Categories && el.Categories.includes(curCat)))
      && (curQuality === '' || (el.Quality && el.Quality === curQuality)),
  ).length;
}

function searchReset() {
  if (openItemDef !== null) toggle(openItemDef);
  searchElement.innerText = '';
  curSearchTerm = searchElement.innerText;
  searchChange();
}

function getItemData() {
  loading = true;
  makeApiCall({ 
    type: 'auctions/items', 
    params: { 
      start: pickerStartDate ? dateFormat(pickerStartDate, "yyyy-MM-dd") : '1970-01-01', 
      end: pickerEndDate  ? dateFormat(pickerEndDate, "yyyy-MM-dd") : '2070-01-01'
    }, 
    returnData: false 
  })
    .then((response) => {
      itemData = response.data;
      categories = itemData.reduce((aggr, cur) => {
        if (!cur.Categories) return aggr;
        cur.Categories.forEach((el) => {
          if (!aggr.includes(el)) aggr.push(el);
        });
        return aggr;
      }, []);
      qualities = itemData.reduce((aggr, cur) => {
        if (!cur.Quality) return aggr;
        if (!aggr.includes(cur.Quality)) aggr.push(cur.Quality);
        return aggr;
      }, []);
      filteredData = itemData.filter(
        (el) => (curSearchTerm.length < 3 || RegExp(curSearchTerm, 'i').test(el.ItemName))
          && (curCat === '' || (el.Categories && el.Categories.includes(curCat)))
          && (curQuality === '' || (el.Quality && el.Quality === curQuality)),
      ).filter((el, i) => i >= curPage * 10 && i < 10 * (curPage + 1));
      curResultsCount = itemData.filter(
        (el) => (curSearchTerm.length < 3 || RegExp(curSearchTerm, 'i').test(el.ItemName))
          && (curCat === '' || (el.Categories && el.Categories.includes(curCat)))
          && (curQuality === '' || (el.Quality && el.Quality === curQuality)),
      ).length;
    })
    .catch(() => {
      error = true;
    })
    .finally(() => {
      loading = false;
      if (openItemDef !== null) {
        if (typeof charts[openItemDef] === 'undefined') {
          getDetailData(openItemDef).then(({ data: detailData }) => {
            chartData[openItemDef] = detailData;
            charts[openItemDef] = getAuctionChart(
              `Chart_${openItemDef}`, 
              detailData.filter((el) => (pickerStartDate === null || (new Date(el.InsertedDate) >= pickerStartDate))
                && (pickerEndDate === null || (new Date(el.InsertedDate) <= pickerEndDate))),
              itemData.find((el) => el.ItemDef === openItemDef).Quality);
            charts[openItemDef].resize();
          }).catch(() => {
            chartData[openItemDef] = false;
          });
        }
      }
    });
}

svelteLifecycleOnMount(async () => {
  getItemData();
  pickerStart = new Easepick.create({
    element: pickerStartElement,
    date: pickerStartDate,
    css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"
    ],
    zIndex: 10,
    setup(picker) {
      picker.on('select', (e) => {
        const { date } = e.detail;
        pickerStartDate = date;
        if (openItemDef !== null) toggle(openItemDef);
        getItemData()
      });
      picker.on('clear', () => {
        pickerStartDate = null;
        if (openItemDef !== null) toggle(openItemDef);
        getItemData()
      });
    },
  })
  pickerEnd = new Easepick.create({
    element: pickerEndElement,
    date: pickerEndDate,
    css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"
    ],
    zIndex: 10,
    setup(picker) {
      picker.on('select', (e) => {
        const { date } = e.detail;
        pickerEndDate = date;
        if (openItemDef !== null) toggle(openItemDef);
        getItemData()
      });
      picker.on('clear', () => {
        pickerEndDate = null;
        if (openItemDef !== null) toggle(openItemDef);
        getItemData()
      });
    },
  })
  crawlEngineData = await makeApiCall({ 
    type: 'auctions/engine', 
    returnData: true
  });
});
</script>

{#if error}
  <StandardError />
{:else}
  {#if crawlEngineData}
  <div class="mb-2">
    {#if crawlEngineData.IsActive}
    <div class="p-2 border-2 border-green-700 rounded-lg">
      <div class="flex items-center justify-center">
        <Icon data="{faCircleCheck}" scale="{1}" class="text-green-700 mr-2"></Icon>
        <div>The crawl engine is up and running, updating <span class="font-bold">{ parseInt(crawlEngineData.ItemsPerDay) }</span> of <span class="font-bold">{ parseInt(crawlEngineData.TotalItems) }</span> items ({(parseInt(crawlEngineData.ItemsPerDay)/parseInt(crawlEngineData.TotalItems)*100).toFixed(2)}%) per day.</div>
      </div>
      <div class="text-center font-bold text-lg text-nwoun underline">
        <a href="https://www.patreon.com/nwoun" target="_blank">HELP US IMPROVING THIS NUMBER!</a>
      </div>
    </div>
    {:else}
    <div class="p-2 border-2 border-red-700 rounded-lg">
      <div class="flex items-center justify-center">
        <Icon data="{faBan}" scale="{1}" class="text-red-700 mr-2"></Icon>
        <div>The crawl engine is offline, but has updated <span class="font-bold">{ parseInt(crawlEngineData.ItemsPerDay) }</span> of <span class="font-bold">{ parseInt(crawlEngineData.TotalItems) }</span> items ({(parseInt(crawlEngineData.ItemsPerDay)/parseInt(crawlEngineData.TotalItems)*100).toFixed(2)}%) in the last 24 hours.</div>
      </div>
      <div class="text-center font-bold text-lg text-nwoun underline">
        <a href="https://www.patreon.com/nwoun" target="_blank">HELP US RUNNING THE ENGINE MORE HOURS PER DAY!</a>
      </div>
    </div>
    {/if}
  </div>
  {:else}
  <div class="mb-2 p-2 border-2 border-gray-700 rounded-lg">
    <div class="text-center">Fetching crawl engine stats...</div>
    <div class="text-center font-bold text-lg text-nwoun underline">
      <a href="https://www.patreon.com/nwoun" target="_blank">HELP US RUNNING THE ENGINE!</a>
    </div>
  </div>
  {/if}
  <div class="flex justify-between items-center mb-2">
    <div id="search" class="auction-tagify flex flex-grow mr-2">
      <span style="background-image: url({faSearch});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10 mr-1" id="filter"></span>
      <tags class="tagify tagify--noTags tagify--empty" tabindex="-1" aria-expanded="false">
        <span contenteditable="" bind:this={searchElement} on:input={(e) => { curSearchTerm = e.target.innerText; searchChange(0); } } tabindex="0" data-placeholder="Search" aria-placeholder="Search" class="tagify__input" role="textbox" aria-autocomplete="both" aria-multiline="false">{ qs.get('s') ? qs.get('s') : '' }</span>
        <div class="cursor-pointer right-1 top-1 absolute" on:click={searchReset} class:invisible={curSearchTerm.length < 3}>
          <Icon data="{faTimesCircle}" scale="{2}" class="text-black"></Icon>
        </div>
      </tags>
    </div>
    <div>
      <select on:change={(e) => { curCat = e.target.value; searchChange(0); }} bind:this={catElement} class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" id="grid-state" style="max-width: 160px; width: 160px">
        <option value="">-- Category --</option>
        {#each categories.sort() as cat}
          <option selected={ curCat === cat ? 'selected' : ''}>{cat}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="flex justify-between items-center mb-2">
    <div class="w-full mr-2 relative">
      <input type="text" bind:this={pickerStartElement} readonly class="w-full border-nwoun bg-transparent cursor-pointer" placeholder="{$localize('auction.search.dateStart')}" />
      {#if pickerStartDate }
      <div  on:click="{() => pickerStart.clear()}" class="absolute right-1 top-1 cursor-pointer">
        <Icon data="{faTimesCircle}" scale="{2}" class="text-black"></Icon>
      </div>
      {/if}
    </div>
    <div class="w-full mr-2 relative">
      <input type="text" bind:this={pickerEndElement} readonly class="w-full border-nwoun bg-transparent cursor-pointer" placeholder="{$localize('auction.search.dateEnd')}" />
      {#if pickerEndDate }
      <div on:click="{() => pickerStart.clear()}" on:click="{() => pickerEnd.clear() }" class="absolute right-1 top-1 cursor-pointer">
        <Icon data="{faTimesCircle}" scale="{2}" class="text-black"></Icon>
      </div>
      {/if}
    </div>
    <div>
      <select on:change={(e) => { curQuality = e.target.value; searchChange(0); }} bind:this={qualityElement} class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" id="grid-state" style="max-width: 160px; width: 160px">
        <option value="">-- Quality --</option>
        {#each qualities as quality}
          <option selected={ curQuality === quality ? 'selected' : ''}>{quality}</option>
        {/each}
      </select>
    </div>
  </div>
  {#if !loading}
  <div class="flex flex-col">
    <div>
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-black border-2 rounded-md">
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
            <tbody class="bg-white divide-y divide-black">
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
    @apply bg-green-500;
  }

  &.Blue,
  &.Rare {
    @apply bg-blue-500;
  }

  &.Purple,
  &.Epic {
    @apply bg-purple-500;
  }

  &.Orange,
  &.Legendary {
    @apply bg-yellow-500;
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