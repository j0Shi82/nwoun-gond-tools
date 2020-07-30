<script>
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Button, Spinner, DevtrackerPost } from 'utils/imports/components';
import axios from 'axios';

let apiData = [];
let devData = [];
let topicData = [];
let loading = true;
let error = false;
let curPage = 0;
let curDev = '';
let curID = '0';
let curPostCount = 500;
$: {
  curPostCount = 500;
  if (curDev !== '') curPostCount = devData.filter((dev) => dev.dev_id === curDev)[0].post_count;
  if (curID !== '0') curPostCount = topicData.filter((topic) => topic.discussion_id === curID)[0].post_count;
}
let requestUri = `https://api.uncnso.red/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
$: {
  requestUri = `https://api.uncnso.red/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
}
const avatarData = {};

function getDevlist() {
  axios.get('https://api.uncnso.red/v1/devtracker/devlist').then((response) => {
    devData = response.data;
  });
}

function getTopics() {
  axios.get('https://api.uncnso.red/v1/devtracker/topiclist?threshold=5').then((response) => {
    topicData = response.data;
  });
}

function get(uri) {
  loading = true;
  axios.get(uri)
    .then((response) => {
      apiData = response.data;

      apiData.map((el) => el.dev_id).reduce((all, cur) => {
        if (!all.includes(cur)) all.push(cur);
        return all;
      }, []).forEach((devID) => {
        axios({
          url: `https://api.uncnso.red/v1/devtracker/devinfo?dev=${devID}`,
        }).then((res) => {
          avatarData[devID] = res.data.Profile.PhotoUrl;
        });
      });
    })
    .catch(() => {
      error = true;
    })
    .finally(() => {
      loading = false;
    });
}

$: {
  get(requestUri);
}

svelteLifecycleOnMount(() => {
  curPage = 0;
  getDevlist();
  getTopics();
});
</script>

{#if !loading}
<div id="form" class="m-2 mb-0">
  <div class="relative">
    <select on:blur="{() => { curPage = 0; }}" bind:value="{curDev}" disabled="{curID !== '0'}" class="block appearance-none w-full bg-black border-2 border-red-700 text-red-700 font-bold py-3 px-4 pr-8 rounded leading-tight focus:outline-none" id="grid-state">
      <option value="" selected>-- Developer --</option>
      {#each devData as data}
      <option value="{data.dev_id}">{data.dev_name} ({data.post_count})</option>
      {/each}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
  <div class="relative mt-2">
    <select on:blur="{() => { curPage = 0; }}" bind:value="{curID}" disabled="{curDev !== ''}" class="block appearance-none w-full bg-black border-2 border-red-700 text-red-700 font-bold py-3 px-4 pr-8 rounded leading-tight focus:outline-none" id="grid-state">
      <option value="0" selected>-- Hot Topics --</option>
      {#each topicData as data}
      <option value="{data.discussion_id}">{data.discussion_name} ({data.post_count})</option>
      {/each}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</div>
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" invisible="{curPage < 1}" click="{() => { curPage -= 1; }}" />
  {#if (curPage + 1) * 20 < curPostCount}<Button text="Next &gt;&gt;" click="{() => { curPage += 1; }}" />{/if}
</div>
{#each apiData as data}
<DevtrackerPost postData="{data}" avatarSrc="{avatarData[data.dev_id] ? avatarData[data.dev_id] : null}" />
{/each}
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" invisible="{curPage < 1}" click="{() => { curPage -= 1; }}" />
  <Button text="Next &gt;&gt;" click="{() => { curPage += 1; }}" />
</div>
{:else}
<Spinner />
{/if}