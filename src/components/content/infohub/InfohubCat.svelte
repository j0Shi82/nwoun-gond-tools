<script>
import { localize, axios } from 'utils/imports/core';
import { svelteCreateEventDispatcher, svelteGetContext } from 'utils/imports/svelte';
import { apiServer } from 'utils/imports/config';
import { infohubLogos } from 'utils/imports/data';
import { InfohubSourceModal, Icon } from 'utils/imports/components';

import faPlusCircle from 'assets/media/fontawesome/plus-circle.svg';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export let apiEndpoint;
export let icon = null;
export let id;
export let titleLocaleIdent;
export let tags;
export let itemCount = 20;
export let show = false;

let apiError = false;
let allData = [];
const dispatch = svelteCreateEventDispatcher();
const { modalOpen } = svelteGetContext('modal');
const showModal = () => {
  modalOpen(InfohubSourceModal, {}, 'infohub.addSource');
};

$: {
  apiError = false;
  dispatch('loading', true);
  axios.get(`${apiServer}${apiEndpoint}?limit=${itemCount}&tags=${tags}`).then((response) => {
    allData = response.data.map((el) => {
      let logo = infohubLogos.pwe;
      if (typeof infohubLogos[el.site] !== 'undefined') logo = infohubLogos[el.site];
      return { ...el, logo };
    });
    dispatch('loading', response.data.length ? false : null);
  }).catch(() => {
    apiError = true;
    dispatch('loading', false);
  });
}
</script>

{#if (allData.length || apiError) && show}
    <div class="col-span-1 md:col-span-2">
        {#if icon !== null}
        <span style="background-image: url({icon});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="{id}">{$localize(titleLocaleIdent)}</span>
        {:else}
        <span class="font-bold text-2xl" id="{id}">{$localize(titleLocaleIdent)}</span>
        {/if}
    </div>
    {#each allData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.link); }}" src="{data.logo}" alt="site logo" />
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
    {/each}
    {#if apiError}
      <div class="col-span-1 md:col-span-2">
        <div class="w-full p-2 rounded-md font-bold">
          <Icon data="{faExclamationTriangle}" scale="1" class="text-nwoun"></Icon>
          <span class="text-nwoun">{$localize('infohub.errors.catError')}</span>
        </div>
      </div>
    {/if}
    <div class="col-span-1 md:col-span-2">
      <div class="w-full bg-orange-600 p-2 text-center rounded-md font-bold cursor-pointer" on:click="{() => { showModal(); }}">
        <span style="background-image: url({faPlusCircle});" class="bg-no-repeat pl-10">{$localize('infohub.addSource')}</span>
      </div>
    </div>
{/if}