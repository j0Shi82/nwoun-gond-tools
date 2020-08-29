<script>
import { svelteLifecycleOnMount, svelteCreateEventDispatcher } from 'utils/imports/svelte';
import { axios, localize } from 'utils/imports/core';
import { apiServer } from 'utils/imports/config';
import { infohubLogos } from 'utils/imports/data';

let pcData = [];
let xboxData = [];
let ps4Data = [];
let allData = [];
const dispatch = svelteCreateEventDispatcher();

async function getArcNews() {
  pcData = await axios.get(`${apiServer}/v1/nwfeeds/arcgamespc`).catch(() => {});
  xboxData = await axios.get(`${apiServer}/v1/nwfeeds/arcgamesxbox`).catch(() => {});
  ps4Data = await axios.get(`${apiServer}/v1/nwfeeds/arcgamesps4`).catch(() => {});

  if (typeof pcData === 'undefined' || pcData.status !== 200) pcData = []; else pcData = pcData.data;
  if (typeof xboxData === 'undefined' || xboxData.status !== 200) xboxData = []; else xboxData = xboxData.data;
  if (typeof ps4Data === 'undefined' || ps4Data.status !== 200) ps4Data = []; else ps4Data = ps4Data.data;

  // merge all data into one
  allData = [
    ...pcData.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [infohubLogos.pc] })),
    ...xboxData.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [infohubLogos.xbox] })),
    ...ps4Data.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [infohubLogos.ps4] })),
  // sort by ts
  ].sort((a, b) => {
    if (a.ts < b.ts) return 1;
    if (a.ts > b.ts) return -1;
    return 0;
  })
  // reduce array to unique ones and group same news from different platforms into one
    .reduce((aggr, cur) => {
      const matchingIndex = aggr.findIndex((el) => el.ts === cur.ts && el.title === cur.title);
      if (matchingIndex !== -1) {
        aggr[matchingIndex].platformLogos.push(...cur.platformLogos);
        aggr[matchingIndex].platformLinks.push(cur.link);
      } else {
        aggr.push(cur);
      }
      return aggr;
    }, [])
  // only show first 10 items
    .filter((el, i) => i < 10);

  dispatch('loading', false);
}

svelteLifecycleOnMount(() => {
  getArcNews();
});
</script>

{#if allData.length}
    <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({infohubLogos.pwe});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="news">{$localize('infohub.official')}</span>
    </div>
    {#each allData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            {#each data.platformLogos as logo, i}
                <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.platformLinks[i]); }}" src="{logo}" alt="platform logo" />
            {/each}
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
    {/each}
{/if}