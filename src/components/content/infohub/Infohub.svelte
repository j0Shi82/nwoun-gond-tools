<script>
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { axios, animateScroll, localize } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Tagify } from 'utils/imports/plugins';
import { InfohubArticles, Icon } from 'utils/imports/components';
import { infohubSections } from 'utils/imports/data';
import { apiServer } from 'utils/imports/config';
import { infohubFirstloadError, currentRouteQuerystring } from 'utils/imports/store';

import 'assets/style/infohub.scss';
import 'assets/style/tagify.scss';

let tags = [];
let tagList = '';
let tagify = null;
let tagsLoaded = false;

const qs = new URLSearchParams($currentRouteQuerystring);
const articleSections = infohubSections.filter((el) => el.type === 'articles');
const sectionStates = articleSections.map((el) => !qs.has('types') || (qs.has('types') && qs.get('types').split(',').includes(el.id)));

$: types = sectionStates.map((el, i) => (el ? articleSections[i].id : false)).filter((el) => el !== false).join(',');

const handleSectionStates = (index) => {
  sectionStates[index] = !sectionStates[index];
};

const searchIcon = infohubSections.filter((el) => el.type === 'filter')[0].icon;

function getTags() {
  axios.get(`${apiServer}/v1/articles/discussiontags`).then((response) => {
    tags = response.data;
    if (tagify !== null) {
      tagify.settings.whitelist.splice(0, tags.map((el) => el.term).length, ...tags.map((el) => el.term));
      if (qs.has('tags')) {
        tagify.addTags(tags.filter((el) => qs.get('tags').split(',').includes(el.id)).map((el) => el.term));
      }
    }
  })
    .catch(() => {
      infohubFirstloadError.set(true);
    })
    .finally(() => {
      tagsLoaded = true;
    });
}

svelteLifecycleOnMount(() => {
  infohubFirstloadError.set(false);
  getTags();
  tagify = new Tagify(
    document.querySelector('#discussionTagFilter input'),
    {
      whitelist: tags.map((el) => el.term),
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
        tagList = '';
      } else {
        tagList = JSON.parse(e.detail.value).map((el) => tags.filter((tag) => tag.term === el.value)).map((el) => el[0].id).join(',');
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
      <div class="col-span-1 md:col-span-2" class:hidden="{$infohubFirstloadError}">
        <span style="background-image: url({searchIcon});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="filter">{$localize('infohub.filter')}</span>
      </div>
      <div class="col-span-1 md:col-span-2" class:hidden="{$infohubFirstloadError}" id="discussionTagFilter">
        <input />
      </div>
      {#if !$infohubFirstloadError}
        <InfohubArticles 
          requestBlock="{!tagsLoaded}"
          tags="{tagList}"
          types="{types}"
        />
      {:else}
        <div class="col-span-1 md:col-span-2">
          <div class="w-full p-2 rounded-md font-bold flex justify-center items-center">
            <Icon data="{faExclamationTriangle}" scale="{2}" class="text-nwoun pr-2 flex-shrink-0"></Icon>
            <span class="text-nwoun">{$localize('errors.catError')}</span>
          </div>
        </div>
      {/if}
    </div>
    <div class="col-span-1 hidden md:block">
        <div class="sticky sticky-right mx-auto" style="max-width: 48px;">
          <div 
            class="border-black pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" 
            style="background-image: url({searchIcon});" 
            on:click="{() => animateScroll.scrollTo({ element: `#filter`, offset: -50 })}"
          >
          </div>
          <div class="border-black border-b-4 my-4"></div>
          {#each articleSections as section, i}
              <div 
                class:opacity-25="{!sectionStates[i]}" 
                class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({section.icon});" on:click="{() => handleSectionStates(i)}">
              </div>
          {/each}
        </div>
    </div>
</div>
<div class="menu-bottom bottom-0 left-0 w-full justify-between items-center flex fixed md:hidden h-12 z-20 bg-nwoun p-1">
  <div class="w-10">
    <div 
      class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" 
      style="background-image: url({searchIcon});"
      on:click="{() => animateScroll.scrollTo({ element: `#filter`, offset: -50 })}"
    >
    </div>
  </div>
  <div class="border-black border-r-4 mx-4 h-full flex-0"></div>
  {#each articleSections as section, i}
      <div class="w-10">
        <div 
          class:opacity-25="{!sectionStates[i]}" 
          class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" 
          style="background-image: url({section.icon});" 
          on:click="{() => handleSectionStates(i)}"
        >
        </div>
      </div>
  {/each}
</div>
