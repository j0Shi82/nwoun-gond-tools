<script>
import {
  localize, routerLocalizedPush,
} from 'utils/imports/core';
import { svelteGetContext, svelteCreateEventDispatcher } from 'utils/imports/svelte';
import { infohubLogos, infohubSections } from 'utils/imports/data';
import { infohubFirstloadError, infohubTags } from 'utils/imports/store';
import { buildQueryStrings, makeApiCall, getInfiniteScrollingObserver } from 'utils/imports/helpers';
import { InfohubSourceModal, Spinner, StandardError } from 'utils/imports/components';

import format from 'date-fns/format';

import faPlusCircle from 'assets/media/fontawesome/plus-circle.svg';

export let types = '';
export let tags = [];
export let canMount = false;

const sectionIcons = infohubSections.reduce((aggr, cur) => {
  // eslint-disable-next-line no-param-reassign
  aggr[cur.id] = cur.icon;
  return aggr;
}, {});
const { modalOpen } = svelteGetContext('modal');
const showModal = () => {
  modalOpen(InfohubSourceModal, {}, 'infohub.addSource');
};

let loading = false;
let firstLoading = true;
let finished = false;
let loadError = false;
let allData = [];
let spinner = null;
let curPage = 1;

const dispatch = svelteCreateEventDispatcher();

const getData = (page) => {
  if (loading || finished) return;
  infohubFirstloadError.set(false);
  loadError = false;
  loading = true;
  dispatch('loading', {
    state: loading,
  });
  if (page === 1) firstLoading = true;
  makeApiCall({ type: 'articles/all', params: { page, types, tags: tags.sort().join(',') }, returnData: false }).then((response) => {
    const newData = response.data.map((el) => {
      const logos = [];
      el.site.split(',').forEach((site) => {
        if (typeof infohubLogos[site] !== 'undefined') logos.push(infohubLogos[site]);
      });
      if (logos.length === 0) logos.push(infohubLogos.pwe);
      return { ...el, logos };
    });

    if (newData.length === 0) finished = true;

    if (page > 1) {
      allData.push(...newData);
      allData = allData;
    } else {
      allData = newData;
    }
  }).catch(() => {
    if (curPage === 1) infohubFirstloadError.set(true);
    if (curPage > 1) loadError = true;
    finished = true;
  }).finally(() => {
    firstLoading = false;
    loading = false;
    dispatch('loading', {
      state: loading,
    });
  });
};

function pushRoute() {
  // redirect to named article routes if only one tag is picked, otherwise index route with paramters
  if (tags.length === 1 && types.split(',').length === 5) {
    routerLocalizedPush('infohub', {
      routeIndex: 1,
      params: {
        url: $infohubTags.filter((tag) => parseInt(tag.id, 10) === parseInt(tags[0], 10))[0].term.replace(/[^0-9a-zA-Z\s]/g, '').replace(/\s/g, '-').toLowerCase(),
      },
    });
  } else {
    routerLocalizedPush('infohub', {
      queryString: buildQueryStrings([
        {
          element: tags.sort().join(','), type: 'value', comp: tags.length, name: 'tags',
        },
        {
          element: types, type: 'value', comp: types.split(',').length < 5, name: 'types',
        },
      ]),
    });
  }
}

// reset curPage whenever tags or types change
// is there a better way?
$: {
  if (canMount) {
    finished = false;
    curPage = 1;
    if (tags.length && types) {
      getData(1);
    } else {
      getData(1);
    }
    pushRoute();
  }
}

// when params change, fetch data again
$: {
  if (canMount) {
    getData(curPage);
    pushRoute();
  }
}

// rercreate observer every time the sponner gets updated
$: {
  if (spinner !== null) {
    const spinnerObserver = getInfiniteScrollingObserver(() => {
      if (!loading) {
        curPage += 1;
      }
    });
    spinnerObserver.observe(spinner);
  }
}
</script>

{#if firstLoading}
<div class="col-span-1 md:col-span-2">
  <Spinner style="margin-bottom:150vh" />
</div>
{/if}
{#if (allData.length) && !firstLoading}
    {#each allData as data, i}
      <div class="flex-auto w-full bg-nwoun p-2 flex items-center rounded-md cursor-pointer" on:click="{() => { window.open(data.link); }}">
        <div class="flex-none h-4 w-4 mr-2 cursor-pointer bg-no-repeat bg-contain bg-center" style="background-image: url({sectionIcons[data.type]});"></div>
        {#each data.logos as logo}
          <img class="flex-none h-4 w-4 mr-2 cursor-pointer" src="{logo}" alt="site logo" />
        {/each}
        <div class="truncate font-medium flex-grow relative mr-3">
          <span>{data.title}</span>
        </div>
        <span class="font-medium justify-self-end whitespace-nowrap">{ format(new Date(data.ts * 1000), 'dd MMM') }</span>
      </div>
      <!-- insert add sources popup in midle of data -->
      {#if (i + 1) % 50 === 0}
      <div class="col-span-1 md:col-span-2">
        <div class="w-full bg-orange-600 p-2 text-center rounded-md font-bold cursor-pointer" on:click="{() => { showModal(); }}">
          <span style="background-image: url({faPlusCircle});" class="bg-no-repeat pl-10">{$localize('infohub.addSource')}</span>
        </div>
      </div>
      {/if}
    {/each}
    {#if allData.length < 50}
      <div class="col-span-1 md:col-span-2">
        <div class="w-full bg-orange-600 p-2 text-center rounded-md font-bold cursor-pointer" on:click="{() => { showModal(); }}">
          <span style="background-image: url({faPlusCircle});" class="bg-no-repeat pl-10">{$localize('infohub.addSource')}</span>
        </div>
      </div>
      {/if}
    {#if !finished}
    <div class="col-span-1 md:col-span-2" bind:this="{spinner}">
      <Spinner />
    </div>
    {/if}
    {#if loadError}
      <div class="col-span-1 md:col-span-2">
        <StandardError type="cta" callback={() => { finished = false; loadError = false; getData(curPage); }} />
      </div>
    {/if}
{/if}