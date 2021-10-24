<script>
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import {
  Button, Spinner, DevtrackerPost, Icon,
} from 'utils/imports/components';
import { devtrackerAvatarList, currentRouteQuerystring } from 'utils/imports/store';
import {
  localize, axios, routerPush, getLocalizedRoute,
} from 'utils/imports/core';
import { apiServer } from 'utils/imports/config';

const qs = new URLSearchParams($currentRouteQuerystring);
let apiData = [];
let devData = [];
let topicData = [];
let loading = true;
let apiError = false;
let curPage = qs.has('start_page') ? parseInt(qs.get('start_page'), 10) : 0;
let curDev = qs.has('dev') ? parseInt(qs.get('dev'), 10) : '';
let curID = qs.has('discussion_id') ? qs.get('discussion_id') : '0';
let curPostCount = 500;

function buildQs() {
  const params = [];
  if (curPage > 0) params.push(`start_page=${curPage}`);
  if (curDev !== '') params.push(`dev=${curDev}`);
  if (curID !== '0') params.push(`discussion_id=${curID}`);
  return params.length ? `?${params.join('&')}` : '';
}

$: {
  curPostCount = 500;
  if (curDev !== '' && devData.length) curPostCount = devData.filter((dev) => dev.dev_id === curDev)[0].post_count;
  if (curID !== '0' && topicData.length) curPostCount = topicData.filter((topic) => topic.discussion_id === curID)[0].post_count;
}

let requestUri = `${apiServer}/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
$: {
  requestUri = `${apiServer}/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
  routerPush(getLocalizedRoute('devtracker') + buildQs());
}
const avatarData = $devtrackerAvatarList;

function getDevlist() {
  axios.get(`${apiServer}/v1/devtracker/devlist`).then((response) => {
    devData = response.data;
  });
}

function getTopics() {
  axios.get(`${apiServer}/v1/devtracker/topiclist?threshold=5`).then((response) => {
    topicData = response.data;
  });
}

function get(uri) {
  loading = true;
  axios.get(uri)
    .then((response) => {
      apiData = response.data;

      apiData
        .map((el) => el.dev_id)
        .reduce((all, cur) => {
          if (!all.includes(cur)) all.push(cur);
          return all;
        }, [])
        .filter((el) => !Object.keys(avatarData).includes(el))
        .forEach((devID) => {
          axios({
            url: `${apiServer}/v1/devtracker/devinfo?dev=${devID}`,
          }).then((res) => {
            avatarData[devID] = res.data.Profile.PhotoUrl;
            devtrackerAvatarList.set(avatarData);
          });
        });
    })
    .catch(() => {
      apiError = true;
    })
    .finally(() => {
      loading = false;
    });
}

$: {
  get(requestUri);
}

function scrollToTop() {
  window.scrollTo({
    top: document.querySelector('#header').offsetHeight + 1,
    left: 0,
  });
}

svelteLifecycleOnMount(() => {
  getDevlist();
  getTopics();
});
</script>

{#if !apiError}
  {#if !loading}
  <div id="form" class="mt-2">
    <select 
      on:change="{() => { curPage = 0; }}" 
      bind:value="{curDev}" 
      disabled="{curID !== '0'}" 
      class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" 
      id="grid-state"
    >
      <option value="" selected>-- Developer --</option>
      {#each devData as data}
        <option value="{data.dev_id}">{data.dev_name} ({data.post_count})</option>
      {/each}
    </select>
    <select 
      on:change="{() => { curPage = 0; }}" 
      bind:value="{curID}" 
      disabled="{curDev !== ''}" 
      class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black mt-2 h-12" 
      id="grid-state"
    >
      <option value="0" selected>-- Hot Topics --</option>
      {#each topicData as data}
        <option value="{data.discussion_id}">{data.discussion_name} ({data.post_count})</option>
      {/each}
    </select>
  </div>
  <div id="pages" class="my-2 flex justify-between">
    <Button text="&lt;&lt; Prev" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" invisible="{curPage < 1}" click="{() => { curPage -= 1; scrollToTop(); }}" />
    {#if (curPage + 1) * 20 < curPostCount}<Button text="Next &gt;&gt;"  colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" click="{() => { curPage += 1; scrollToTop(); }}" />{/if}
  </div>
  {#each apiData as data}
  <DevtrackerPost postData="{data}" avatarSrc="{avatarData[data.dev_id] ? avatarData[data.dev_id] : null}" />
  {/each}
  <div id="pages" class="my-2 flex justify-between">
    <Button text="&lt;&lt; Prev" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" invisible="{curPage < 1}" click="{() => { curPage -= 1; scrollToTop(); }}" />
      {#if (curPage + 1) * 20 < curPostCount}<Button text="Next &gt;&gt;" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" click="{() => { curPage += 1; scrollToTop(); }}" />{/if}
  </div>
  {:else}
  <Spinner />
  {/if}
{:else}
  <div class="col-span-1 md:col-span-2">
    <div class="w-full p-2 rounded-md font-bold  flex justify-center items-center">
      <Icon data="{faExclamationTriangle}" scale="{2}" class="text-nwoun flex-shrink-0"></Icon>
      <span class="text-nwoun">{$localize('infohub.errors.catError')}</span>
    </div>
  </div>
{/if}