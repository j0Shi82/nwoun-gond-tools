<script>
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import axios from 'axios';

let apiData = [];
let error = false;
// const avatarData = {};

svelteLifecycleOnMount(() => {
  axios.get('https://api.uncnso.red/v1/devtracker/list')
    .then((response) => {
      apiData = response.data;

      apiData.forEach((data) => {
        axios({
          url: `https://api.uncnso.red/v1/devtracker/devinfo?dev=${data.dev_name}`,
        }).then((res) => {
          console.log(res);
        });
      });
    })
    .catch(() => {
      error = true;
    });
});
</script>

<div id="form"></div>
<div id="pages"></div>
{#each apiData as data}
<div class="flex items-center rounded-md bg-red-700 p-2 m-2">
    <div>{data.dev_name}</div>
    <div>
        <div class="w-full border-black border-b-2 text-lg bold">{data.discussion_name}</div>
        <div class="italic">{data.body}</div>
    </div>
</div>
{/each}