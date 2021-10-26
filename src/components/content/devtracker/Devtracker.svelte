<script>
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import {
  Spinner, DevtrackerPost, StandardError,
} from 'utils/imports/components';
import { devtrackerAvatarList, currentRouteQuerystring } from 'utils/imports/store';
import {
  axios, routerLocalizedPush,
} from 'utils/imports/core';
import { apiServer } from 'utils/imports/config';
import { buildQueryStrings } from 'utils/imports/helpers';

const qs = new URLSearchParams($currentRouteQuerystring);
let apiData = [];
let devData = [];
let topicData = [];
let spinner = null;
let firstLoading = true;
let loading = false;
let apiError = false;
let finished = false;
let curPage = 1;
let curDev = qs.has('dev') ? parseInt(qs.get('dev'), 10) : '';
let curID = qs.has('discussion_id') ? qs.get('discussion_id') : '0';
let curPostCount = 500;

$: {
  curPostCount = 500;
  if (curDev !== '' && devData.length) curPostCount = devData.filter((dev) => dev.dev_id === curDev)[0].post_count;
  if (curID !== '0' && topicData.length) curPostCount = topicData.filter((topic) => topic.discussion_id === curID)[0].post_count;
}

let requestUri = `${apiServer}/v1/devtracker/list?page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
$: {
  requestUri = `${apiServer}/v1/devtracker/list?page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
  routerLocalizedPush('devtracker', buildQueryStrings([
    {
      element: curDev, type: 'value', comp: curDev !== '', name: 'dev',
    },
    {
      element: curID, type: 'value', comp: curID !== '0', name: 'discussion_id',
    },
  ]));
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
  if (loading || finished) return;
  if (curPage === 1) firstLoading = true;
  loading = true;
  axios.get(uri)
    .then((response) => {
      const newData = response.data;

      if (newData.length < 10) finished = true;

      newData
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

      if (curPage > 1) {
        apiData.push(...newData);
        apiData = apiData;
      } else {
        apiData = newData;
      }
    })
    .catch(() => {
      apiError = true;
      finished = true;
    })
    .finally(() => {
      loading = false;
      firstLoading = false;
    });
}

$: {
  get(requestUri);
}

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

svelteLifecycleOnMount(() => {
  getDevlist();
  getTopics();
});
</script>

{#if !apiError || apiData.length}
  {#if firstLoading}
    <div class="col-span-1 md:col-span-2">
      <Spinner style="margin-bottom:150vh" />
    </div>
  {/if}
  {#if (apiData.length) && !firstLoading}
    <div id="form" class="mt-2">
      <select 
        on:change="{() => { finished = false; apiError = false; curPage = 1; }}" 
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
        on:change="{() => { finished = false; apiError = false; curPage = 1; }}" 
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
    {#each apiData as data}
    <DevtrackerPost postData="{data}" avatarSrc="{avatarData[data.dev_id] ? avatarData[data.dev_id] : null}" />
    {/each}
    {#if !finished}
      <div class="col-span-1 md:col-span-2" bind:this="{spinner}">
        <Spinner />
      </div>
    {/if}
    {#if apiError}
      <div class="col-span-1 md:col-span-2">
        <StandardError type="cta" callback={() => { finished = false; apiError = false; get(requestUri); }} />
      </div>
    {/if}
  {/if}
{:else}
  <div class="col-span-1 md:col-span-2">
    <StandardError />
  </div>
{/if}