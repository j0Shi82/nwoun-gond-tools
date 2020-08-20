<script>
import { axios, animateScroll } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Tagify } from 'utils/imports/plugins';

import pcLogo from 'assets/media/images/Windows_logo_-_2012_derivative.svg.png';
import xboxLogo from 'assets/media/images/Xbox_one_logo.svg.png';
import ps4Logo from 'assets/media/images/ps4-logos-scee-blue.png';
import pweLogo from 'assets/media/images/arclogo.png';
import redditLogo from 'assets/media/images/reddit_icon.png';
import faSearch from 'assets/media/fontawesome/search.svg';
import faComment from 'assets/media/fontawesome/comment.svg';
import faBookMedical from 'assets/media/fontawesome/book-medical.svg';
import faNewspaper from 'assets/media/fontawesome/newspaper.svg';

import 'assets/style/infohub.scss';

let pcData = [];
let xboxData = [];
let ps4Data = [];
let allData = [];
let allDiscussionData = [];
let allNewsData = [];
let allGuidesData = [];
let discussionTags = [];
let tagify = null;

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

function getCommunityNews(tags = '') {
  axios.get(`http://localhost:8080/v1/infoaggregates/news?limit=20&tags=${tags}`).then((response) => {
    allNewsData = response.data.map((el) => {
      let logo = pweLogo;
      switch (el.site) {
        case 'mop':
          logo = 'https://massivelyop.com/wp-content/uploads/2015/03/150mo.png';
          break;
        case 'mmobomb':
          logo = 'https://www.anook.com/uploads/profiles/big/50f9aa07f1be6.png';
          break;
        case 'bleedingcool':
          logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAAD///8BAQH8/PwDAwNISEgaGhpOTk4MDAxtbW2np6eZmZmhoaGBgYHm5ub4+PjNzc0/Pz+Ojo7V1dXd3d2tra0yMjJ0dHR8fHxUVFQ6OjrExMS0tLRcXFzv7+8fHx8TExMnJyc2lRAPAAAAt0lEQVQYlSWQRxbDIAxER2C6cQP3mCT3v2QE0Urva1RGEAItBLrun1kXQh9Vx6gV1UAckpYlXaiam0Y5qp5u/aJQJe7m8lRoBh4K3BdzptEnWln/0AXMl6NyLSQ3JuvKYHfcw2NLnrS5geP4xugbok0PB/YAC0M0qLf66BJwJgY78QK+NN4Kn2KAk+TgjNGZJiBKBbzaYJPI10tkik8/lTE/3r+rTXsu/WGttmKbq+/mumtfEEL8AHXkCOJ2NNrTAAAAAElFTkSuQmCC';
          break;
        case 'mmorpg':
          logo = 'https://imgur.com/73lKT87.png';
          break;
        case 'destructoid':
          logo = 'https://www.destructoid.com/sites/_default/img/top-nav/destructoid-logo.png';
          break;
        case 'mp1st':
          logo = 'https://mp1st.com/wp-content/themes/Phoenix/images/favicon.ico?v=20171015';
          break;
        case 'xboxhub':
          logo = 'https://www.thexboxhub.com/wp-content/uploads/2014/07/new-txh-logo-500-360x360.png';
          break;
        case 'flickmyth':
          logo = 'https://www.flickeringmyth.com/wp-content/themes/news-pro/images/favicon.ico';
          break;
        case 'hcgamer':
          logo = 'https://hardcoregamer.com/wp-content/themes/hardcore-gamer-theme/favicon.png';
          break;
        case 'nerdstash':
          logo = 'https://tnsmedialibrary.s3-accelerate.amazonaws.com/2015/02/favicon.ico';
          break;
        default: logo = pweLogo;
      }
      return { ...el, logo };
    });
  });
}

function getCommunityGuides(tags = '') {
  axios.get(`http://localhost:8080/v1/infoaggregates/guides?limit=20&tags=${tags}`).then((response) => {
    allGuidesData = response.data.map((el) => {
      let logo = pweLogo;
      switch (el.site) {
        case 'mmominds':
          logo = 'https://nw.mmominds.com/favicon.ico';
          break;
        case 'occarticle':
          logo = 'https://www.overclockersclub.com/favicon.ico';
          break;
        case 'occguide':
          logo = 'https://www.overclockersclub.com/favicon.ico';
          break;
        case 'jannew':
          logo = 'https://jannenw.info/favicon.ico';
          break;
        default: logo = pweLogo;
      }
      return { ...el, logo };
    });
  });
}

function getCommunityDiscussions(tags = '') {
  axios.get(`http://localhost:8080/v1/infoaggregates/discussion?limit=50&tags=${tags}`).then((response) => {
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
    if (tagify !== null) {
      tagify.settings.whitelist.splice(0, discussionTags.map((el) => el.term).length, ...discussionTags.map((el) => el.term));
    }
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
  getCommunityNews();
  getCommunityGuides();
  tagify = new Tagify(
    document.querySelector('#discussionTagFilter input'),
    {
      whitelist: discussionTags.map((el) => el.term),
      enforceWhitelist: true,
      skipInvalid: true,
      editTags: false,
      placeholder: 'Add tags to filter posts',
      dropdown: {
        classname: 'color-nwoun',
        enabled: 3, // show the dropdown immediately on focus
        maxItems: 10,
        position: 'text', // place the dropdown near the typed text
        closeOnSelect: true, // keep the dropdown open after selecting a suggestion
        highlightFirst: true,
      },
    },
  );
  tagify
    .on('change', (e) => {
      if (e.detail.value === '') {
        getCommunityDiscussions();
        getCommunityNews();
        getCommunityGuides();
      } else {
        getCommunityDiscussions(JSON.parse(e.detail.value).map((el) => discussionTags.filter((tag) => tag.term === el.value)).map((el) => el[0].id).join(','));
        getCommunityNews(JSON.parse(e.detail.value).map((el) => discussionTags.filter((tag) => tag.term === el.value)).map((el) => el[0].id).join(','));
        getCommunityGuides(JSON.parse(e.detail.value).map((el) => discussionTags.filter((tag) => tag.term === el.value)).map((el) => el[0].id).join(','));
      }
    });
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
        <span style="background-image: url({faSearch});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="filter">Filter</span>
      </div>
      <div class="col-span-1 md:col-span-2" id="discussionTagFilter">
        <input />
      </div>
      <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({pweLogo});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="news">Official News</span>
      </div>
      {#each allData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            {#each data.platformLogos as logo, i}
              <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.platformLinks[i]); }}" src="{logo}" alt="platform logo" />
            {/each}
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
      <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({faNewspaper});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="mmonews">External News</span>
      </div>
      {#each allNewsData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.link); }}" src="{data.logo}" alt="site logo" />
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
      <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({faBookMedical});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="guides">Guides / Blogs</span>
      </div>
      {#each allGuidesData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.link); }}" src="{data.logo}" alt="site logo" />
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
      <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({faComment});"  class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="discussion">Discussion</span>
      </div>
      {#each allDiscussionData as data}
        <div class="w-full bg-nwoun p-2 flex items-center rounded-md">
            <img class="h-4 w-4 mr-2 cursor-pointer" on:click="{() => { window.open(data.link); }}" src="{data.logo}" alt="platform logo" />
            <a href="{data.link}" target="_blank" class="truncate font-medium">{data.title}</a>
        </div>
      {/each}
    </div>
    <div class="col-span-1 hidden md:block">
        <div class="sticky sticky-right mx-auto" style="max-width: 48px;">
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({faSearch});" on:click="{() => animateScroll.scrollTo({ element: '#filter', offset: -50 })}">
          </div>
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({pweLogo});" on:click="{() => animateScroll.scrollTo({ element: '#news', offset: -50 })}">
          </div>
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({faNewspaper});" on:click="{() => animateScroll.scrollTo({ element: '#mmonews', offset: -50 })}">
          </div>
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({faBookMedical});" on:click="{() => animateScroll.scrollTo({ element: '#guides', offset: -50 })}">
          </div>
          <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({faComment});" on:click="{() => animateScroll.scrollTo({ element: '#discussion', offset: -50 })}">
          </div>
        </div>
    </div>
</div>

<div class="menu-bottom bottom-0 left-0 w-full justify-between items-center flex fixed md:hidden h-12 z-20 bg-nwoun p-1">
  <div class="w-10">
    <div class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({faSearch});" on:click="{() => animateScroll.scrollToTop({ element: '#filter', offset: -50 })}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({pweLogo});" on:click="{() => animateScroll.scrollToTop({ element: '#news', offset: -50 })}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({faNewspaper});" on:click="{() => animateScroll.scrollTo({ element: '#mmonews', offset: -50 })}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({faBookMedical});" on:click="{() => animateScroll.scrollTo({ element: '#guides', offset: -50 })}">
    </div>
  </div>
  <div class="w-10">
    <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({faComment});" on:click="{() => animateScroll.scrollTo({ element: '#discussion', offset: -50 })}">
    </div>
  </div>
</div>

