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
import { buildQueryStrings, makeApiCall, getInfiniteScrollingObserver } from 'utils/imports/helpers';

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
let curDev = qs.has('dev') ? qs.get('dev') : '';
let curID = qs.has('discussion_id') ? qs.get('discussion_id') : '0';

function getDevPosts() {
  if (loading || finished) return;
  if (curPage === 1) firstLoading = true;
  loading = true;
  makeApiCall({ type: 'devtracker/postlist', params: { curPage, curDev, curID }, returnData: false })
    .then((response) => {
      const newData = response.data;

      if (newData.length < 20) finished = true;

      newData
        .map((el) => `${el.dev_name}::${el.dev_id}`)
        .reduce((all, cur) => {
          if (!all.includes(cur)) all.push(cur);
          return all;
        }, [])
        .filter((el) => !Object.keys(avatarData).includes(el))
        .forEach((devIdent) => {
          axios({
            url: `${apiServer}/v1/devtracker/devinfo?dev=${devIdent.split('::')[0]}&id=${devIdent.split('::')[1]}`,
          }).then((res) => {
            avatarData[devIdent] = res.data.img;
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

const searchReload = (resetPage = false) => {
  curPage = resetPage ? 1 : curPage;
  finished = false;
  apiError = false;
  getDevPosts();
};

$: {
  routerLocalizedPush('devtracker', buildQueryStrings([
    {
      element: curDev, type: 'value', comp: curDev !== '', name: 'dev',
    },
    {
      element: curID, type: 'value', comp: curID !== '0', name: 'discussion_id',
    },
  ]));

  searchReload(true);
}

$: {
  if (spinner !== null) {
    const spinnerObserver = getInfiniteScrollingObserver(() => {
      if (!loading) {
        curPage += 1;
        searchReload();
      }
    });
    spinnerObserver.observe(spinner);
  }
}

svelteLifecycleOnMount(() => {
  makeApiCall({ type: 'devtracker/devlist', nullCatch: true }).then((data) => {
    devData = data;
  });
  makeApiCall({ type: 'devtracker/topiclist', nullCatch: true }).then((data) => {
    topicData = data;
  });
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
        bind:value="{curDev}" 
        disabled="{curID !== '0'}" 
        class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" 
        id="grid-state"
      >
        <option value="" selected>-- Developer --</option>
        {#each devData as data}
          <option value="{data.dev_name}">{data.dev_name} ({data.post_count})</option>
        {/each}
      </select>
      <select 
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
    <DevtrackerPost postData="{data}" avatarSrc="{avatarData[`${data.dev_name}::${data.dev_id}`] ? avatarData[`${data.dev_name}::${data.dev_id}`] : null}" />
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