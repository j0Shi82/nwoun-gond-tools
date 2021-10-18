<script>
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Button, Spinner, DevtrackerPost } from 'utils/imports/components';
import { devtrackerAvatarList } from 'utils/imports/store';
import { axios } from 'utils/imports/core';
import { apiServer } from 'utils/imports/config';

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
let requestUri = `${apiServer}/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
$: {
  requestUri = `${apiServer}/v1/devtracker/list?start_page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
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
      error = true;
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
  curPage = 0;
  getDevlist();
  getTopics();
});
</script>

{#if !loading}
<div id="form" class="m-2 mb-0">
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
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" invisible="{curPage < 1}" click="{() => { curPage -= 1; scrollToTop(); }}" />
  {#if (curPage + 1) * 20 < curPostCount}<Button text="Next &gt;&gt;"  colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" click="{() => { curPage += 1; scrollToTop(); }}" />{/if}
</div>
{#each apiData as data}
<DevtrackerPost postData="{data}" avatarSrc="{avatarData[data.dev_id] ? avatarData[data.dev_id] : null}" />
{/each}
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" invisible="{curPage < 1}" click="{() => { curPage -= 1; scrollToTop(); }}" />
    {#if (curPage + 1) * 20 < curPostCount}<Button text="Next &gt;&gt;" colorClasses="border-black bg-gray-300 bg-opacity-50 text-black" click="{() => { curPage += 1; scrollToTop(); }}" />{/if}
</div>
{:else}
<Spinner />
{/if}