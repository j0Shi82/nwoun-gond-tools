<script>
import { axios } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';

import pcLogo from 'assets/media/images/Windows_logo_-_2012_derivative.svg.png';
import xboxLogo from 'assets/media/images/Xbox_one_logo.svg.png';
import ps4Logo from 'assets/media/images/ps4-logos-scee-blue.png';

let pcData = [];
let xboxData = [];
let ps4Data = [];
let allData = [];

function getPCPosts() {
  axios.get('https://api.uncnso.red/v1/nwfeeds/arcgamespc').then((response) => {
    pcData = response.data;
  });

  axios.get('https://api.uncnso.red/v1/nwfeeds/arcgamesxbox').then((response) => {
    xboxData = response.data;
  });

  axios.get('https://api.uncnso.red/v1/nwfeeds/arcgamesps4').then((response) => {
    ps4Data = response.data;
  });
}

$: {
  allData = [
    ...pcData.map((el) => ({ ...el, platformLogo: pcLogo })),
    ...xboxData.map((el) => ({ ...el, platformLogo: xboxLogo })),
    ...ps4Data.map((el) => ({ ...el, platformLogo: ps4Logo })),
  ].sort((a, b) => {
    if (a.ts < b.ts) return 1;
    if (a.ts > b.ts) return -1;
    return 0;
  });
  console.log(allData);
}

svelteLifecycleOnMount(() => {
  getPCPosts();
});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
{#each allData as data}
    <div class="w-full bg-nwoun p-2 flex items-center">
        <img class="h-4 w-4 mr-2" src="{data.platformLogo}" alt="platform logo" />
        <a href="{data.link}" target="_blank" class="truncate">{data.title}</a>
    </div>
{/each}
</div>

