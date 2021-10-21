<script>
import { localize, axios } from 'utils/imports/core';
import { svelteGetContext } from 'utils/imports/svelte';
import { apiServer } from 'utils/imports/config';
import { infohubLogos, infohubSections } from 'utils/imports/data';
import { infohubApiError } from 'utils/imports/store';
import { InfohubSourceModal, Spinner } from 'utils/imports/components';

import format from 'date-fns/format';

import faPlusCircle from 'assets/media/fontawesome/plus-circle.svg';

export let types = '';
export let tags;

let loading = false;
let firstLoading = true;
let finished = false;
let allData = [];
let spinner = null;
let curPage = 1;
const sectionIcons = infohubSections.reduce((aggr, cur) => {
  // eslint-disable-next-line no-param-reassign
  aggr[cur.id] = cur.icon;
  return aggr;
}, {});
const { modalOpen } = svelteGetContext('modal');
const showModal = () => {
  modalOpen(InfohubSourceModal, {}, 'infohub.addSource');
};

// main data fetching function, pushes to data if page > 2 and replaces if page === 1
const getData = (page) => {
  if (loading || finished) return;
  infohubApiError.set(false);
  loading = true;
  if (page === 1) firstLoading = true;
  axios.get(`${apiServer}/v1/articles/all?limit=100&page=${page}&tags=${tags}&types=${types}`).then((response) => {
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
    infohubApiError.set(true);
    finished = true;
  }).finally(() => {
    firstLoading = false;
    loading = false;
  });
};

// reset curPage whenever tags or types change
// is there a better way?
$: {
  finished = false;
  curPage = 1;
  if (tags && types) {
    getData(1);
  } else {
    getData(1);
  }
}

// when params change, fetch data again
$: getData(curPage);

const getObserver = () => new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !loading && !finished) {
    curPage += 1;
  }
}, {
  rootMargin: '500px',
});

// rercreate observer every time the sponner gets updated
$: {
  if (spinner !== null && !loading && !finished) {
    const spinnerObserver = getObserver();
    spinnerObserver.observe(spinner);
  }
}
</script>

{#if firstLoading}
<div class="col-span-1 md:col-span-2">
  <Spinner />
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
{/if}