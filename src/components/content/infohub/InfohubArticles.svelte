<script>
import { localize, axios } from 'utils/imports/core';
import { svelteGetContext } from 'utils/imports/svelte';
import { apiServer } from 'utils/imports/config';
import { infohubLogos, infohubSections } from 'utils/imports/data';
import { InfohubSourceModal, Icon, Spinner } from 'utils/imports/components';

import faPlusCircle from 'assets/media/fontawesome/plus-circle.svg';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export let types = '';
export let tags;

let apiError = false;
let loading = true;
let allData = [];
let spinner;
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

const getObserver = () => new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    curPage += 1;
    axios.get(`${apiServer}/v1/articles/all?limit=100&page=${curPage}tags=${tags}&types=${types}`).then((response) => {
      allData.push(...response.data.map((el) => {
        const logos = [];
        el.site.split(',').forEach((site) => {
          if (typeof infohubLogos[site] !== 'undefined') logos.push(infohubLogos[site]);
        });
        if (logos.length === 0) logos.push(infohubLogos.pwe);
        return { ...el, logos };
      }));
      allData = allData;
    }).catch(() => {
      apiError = true;
    }).finally(() => {
      loading = false;
    });
  }
});

$: {
  if (typeof spinner !== 'undefined') {
    const spinnerObserver = getObserver();
    spinnerObserver.observe(spinner);
  }
}

$: {
  apiError = false;
  loading = true;
  curPage = 1;
  allData = [];
  axios.get(`${apiServer}/v1/articles/all?limit=100&tags=${tags}&types=${types}`).then((response) => {
    allData = response.data.map((el) => {
      const logos = [];
      el.site.split(',').forEach((site) => {
        if (typeof infohubLogos[site] !== 'undefined') logos.push(infohubLogos[site]);
      });
      if (logos.length === 0) logos.push(infohubLogos.pwe);
      return { ...el, logos };
    });
  }).catch(() => {
    apiError = true;
  }).finally(() => {
    loading = false;
  });
}
</script>

{#if loading}
<div class="col-span-1 md:col-span-2">
  <Spinner />
</div>
{/if}
{#if (allData.length || apiError) && !loading}
    {#each allData as data, i}
      <div class="flex-auto w-full bg-nwoun p-2 flex items-center rounded-md cursor-pointer" on:click="{() => { window.open(data.link); }}">
        <div class="flex-none h-4 w-4 mr-2 cursor-pointer bg-no-repeat bg-contain bg-center" style="background-image: url({sectionIcons[data.type]});"></div>
        {#each data.logos as logo}
          <img class="flex-none h-4 w-4 mr-2 cursor-pointer" src="{logo}" alt="site logo" />
        {/each}
        <span class="truncate font-medium">{data.title}</span>
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
    {#if apiError}
      <div class="col-span-1 md:col-span-2">
        <div class="w-full p-2 rounded-md font-bold">
          <Icon data="{faExclamationTriangle}" scale="1" class="text-nwoun"></Icon>
          <span class="text-nwoun">{$localize('infohub.errors.catError')}</span>
        </div>
      </div>
    {/if}
    <div class="col-span-1 md:col-span-2" bind:this="{spinner}">
      <Spinner />
    </div>
{/if}