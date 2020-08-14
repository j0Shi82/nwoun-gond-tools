<script>
import { axios, animateScroll } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';

import pcLogo from 'assets/media/images/Windows_logo_-_2012_derivative.svg.png';
import xboxLogo from 'assets/media/images/Xbox_one_logo.svg.png';
import ps4Logo from 'assets/media/images/ps4-logos-scee-blue.png';
import pweLogo from 'assets/media/images/arclogo.png';
import redditLogo from 'assets/media/images/reddit_icon.png';
import dicussionLogo from 'assets/media/images/Wikiversity-Mooc-Icon-Discussion.svg.png';

let pcData = [];
let xboxData = [];
let ps4Data = [];
let allData = [];
let allDiscussionData = [];
let discussionTags = [];
let currentDiscussionTag = 0;

function getArcNews() {
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

function getCommunityDiscussions(tag = '') {
  axios.get(`http://localhost:8080/v1/infoaggregates/discussion?limit=50&tag=${tag}`).then((response) => {
    allDiscussionData = response.data.map((el) => {
      let logo = pweLogo;
      switch (el.site) {
        case 'nwreddit':
          logo = redditLogo;
          break;
        case 'arcgamesforum':
          logo = pweLogo;
          break;
        default: logo = pweLogo;
      }
      return { ...el, logo };
    });
  });

  axios.get('http://localhost:8080/v1/infoaggregates/discussiontags').then((response) => {
    discussionTags = response.data;
  });
}

$: {
  // merge all data into one
  allData = [
    ...pcData.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [pcLogo] })),
    ...xboxData.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [xboxLogo] })),
    ...ps4Data.map((el) => ({ ...el, platformLinks: [el.link], platformLogos: [ps4Logo] })),
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
  // only show first 16 items
    .filter((el, i) => i < 16);
}

svelteLifecycleOnMount(() => {
  getArcNews();
  getCommunityDiscussions();
});
</script>

<style lang="scss">
  .sticky-right {
    top: calc(theme('height.12') + theme('padding.2'));
  }

  .menu-bottom {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.75);
  }
</style>

<div class="grid md:grid-cols-12 grid-cols-11 gap-2 pb-12 md:pb-0">
    <div class="grid grid-cols-1 md:grid-cols-2 col-span-11 gap-2">
      <div class="col-span-1 md:col-span-2">
        <span class="font-bold text-2xl" id="news">Official News</span>
      </div>
      {#each allData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            {#each data.platformLogos as logo, i}
              <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.platformLinks[i]); }}" src="{logo}" alt="platform logo" />
            {/each}
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
      <div>
        <span class="font-bold text-2xl" id="discussion">Discussion</span>
      </div>
      <div class="relative">
        <select bind:value="{currentDiscussionTag}" on:blur="{() => { getCommunityDiscussions(currentDiscussionTag); }}" class="block appearance-none w-full bg-black border-2 border-red-700 text-red-700 font-bold py-3 px-4 pr-8 rounded leading-tight focus:outline-none" id="grid-state">
          <option value="0">--- CHOOSE ---</option>
          {#each discussionTags as tag}
          <option value="{tag.id}">{tag.term}</option>
          {/each}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      </div>
      {#each allDiscussionData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.link); }}" src="{data.logo}" alt="platform logo" />
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
    </div>
    <div class="col-span-1 hidden md:block">
        <div class="sticky sticky-right">
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({pweLogo});" on:click="{() => animateScroll.scrollToTop()}">
          </div>
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({dicussionLogo});" on:click="{() => animateScroll.scrollTo({ element: '#discussion', offset: -50 })}">
          </div>
        </div>
    </div>
</div>

<div class="menu-bottom bottom-0 left-0 w-full justify-between items-center flex fixed md:hidden h-12 z-20 bg-nwoun p-1">
  <div class="w-10">
    <div class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({pweLogo});" on:click="{() => animateScroll.scrollToTop()}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({dicussionLogo});" on:click="{() => animateScroll.scrollTo({ element: '#discussion', offset: -50 })}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 bg-contain bg-center bg-no-repeat" style="background-image: url({pweLogo});">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 bg-contain bg-center bg-no-repeat" style="background-image: url({pweLogo});">
    </div>
  </div>
</div>

