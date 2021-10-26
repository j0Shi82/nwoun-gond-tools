<script>
import { svelteLifecycleOnMount, svelteTick } from 'utils/imports/svelte';
import {
  Spinner, DevtrackerPost, StandardError,
} from 'utils/imports/components';
import { devtrackerAvatarList, currentRouteQuerystring } from 'utils/imports/store';
import {
  axios, routerLocalizedPush,
} from 'utils/imports/core';
import { apiServer } from 'utils/imports/config';
import { buildQueryStrings, makeApiCall } from 'utils/imports/helpers';

const qs = new URLSearchParams($currentRouteQuerystring);
const avatarData = $devtrackerAvatarList;
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

$: {
  routerLocalizedPush('devtracker', buildQueryStrings([
    {
      element: curDev, type: 'value', comp: curDev !== '', name: 'dev',
    },
    {
      element: curID, type: 'value', comp: curID !== '0', name: 'discussion_id',
    },
  ]));
}

function getDevPosts() {
  if (loading || finished) return;
  if (curPage === 1) firstLoading = true;
  loading = true;
  makeApiCall({ type: 'devtracker/postlist', params: { curPage, curDev, curID }, returnData: false })
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

async function searchReload(resetPage = false) {
  await svelteTick(); // need tick to wait for curDev and curID to get set
  curPage = resetPage ? 1 : curPage;
  finished = false;
  apiError = false;
  getDevPosts();
}

const getObserver = () => new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !loading && !finished) {
    curPage += 1;
    getDevPosts();
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

svelteLifecycleOnMount(async () => {
  devData = await makeApiCall({ type: 'devtracker/devlist', nullCatch: true });
  topicData = await makeApiCall({ type: 'devtracker/topiclist', nullCatch: true });
  getDevPosts();
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
        on:change="{() => { searchReload(true); }}" 
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
        on:change="{() => { searchReload(true); }}" 
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
        <StandardError type="cta" callback={() => { searchReload(); }} />
      </div>
    {/if}
  {/if}
{:else}
  <div class="col-span-1 md:col-span-2">
    <StandardError />
  </div>
{/if}