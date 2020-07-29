<script>
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { formatDate, formatTime } from 'utils/imports/core';
import { Button, Spinner } from 'utils/imports/components';
import axios from 'axios';

let apiData = [];
let loading = true;
let error = false;
let curPage = 0;
let requestUri = `https://api.uncnso.red/v1/devtracker/list?start_page=${curPage}`;
$: {
  requestUri = `https://api.uncnso.red/v1/devtracker/list?start_page=${curPage}`;
}
const avatarData = {};

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
});

function visitForum(data) {
  const href = parseInt(data.comment_id, 10) !== 0 ? `https://forum.arcgames.com/neverwinter/discussion/comment/${data.comment_id}` : `https://forum.arcgames.com/neverwinter/discussion/${data.discussion_id}`;
  window.open(href);
}
</script>

{#if !loading}
<div id="form" class="p-2">
  <div class="relative">
    <select class="block appearance-none w-full bg-black border border-red-700 text-red-700 font-bold py-3 px-4 pr-8 rounded leading-tight focus:outline-none" id="grid-state">
      <option>New Mexico</option>
      <option>Missouri</option>
      <option>Texas</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</div>
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" invisible="{curPage < 1}" click="{() => { curPage -= 1; }}" />
  <Button text="Next &gt;&gt;" click="{() => { curPage += 1; }}" />
</div>
{#each apiData as data}
<div class="flex flex-col md:flex-row items-center md:items-start rounded-md bg-red-700 p-2 m-2 cursor-pointer" on:click="{() => visitForum(data)}">
    <div class="w-full md:w-auto flex-none flex md:flex-col md:mr-2 mb-2 md:mb-0">
      <div class="flex-none w-16 h-16 md:w-32 md:h-32 rounded-full overflow-hidden border-black border-2">
        <img src="{avatarData[data.dev_id] ? avatarData[data.dev_id] : 'https://www.arcgames.com/images/account/user.jpg'}" alt="avatar" />
      </div>
      <div class="flex-auto flex flex-col justify-center">
        <div class="w-full md:w-32 text-sm font-bold text-center truncate">{data.dev_name}</div>
        <div class="w-full text-center text-sm italic">{$formatDate(new Date(data.timestamp * 1000))} {$formatTime(new Date(data.timestamp * 1000))}</div>
      </div>
    </div>
    <div class="flex-auto">
        <div class="w-full border-black border-b-2 text-lg bold">{data.discussion_name}</div>
        <div class="italic">{data.body}</div>
    </div>
</div>
{/each}
<div id="pages" class="m-2 flex justify-between">
  <Button text="&lt;&lt; Prev" invisible="{curPage < 1}" click="{() => { curPage -= 1; }}" />
  <Button text="Next &gt;&gt;" click="{() => { curPage += 1; }}" />
</div>
{:else}
<Spinner />
{/if}