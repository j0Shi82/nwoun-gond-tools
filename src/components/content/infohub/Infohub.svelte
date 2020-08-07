<script>
import { axios } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';

let pcData = {};

function getPCPosts() {
  axios.get('https://api.uncnso.red/v1/nwfeeds/arcgamespc').then((response) => {
    pcData = response.data;
  });
}

svelteLifecycleOnMount(() => {
  getPCPosts();
});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
{#each pcData as data}
    <div class="w-full bg-nwoun p-2">
        <a href="{data.link}" target="_blank">{data.title}</a>
    </div>
{/each}
</div>

