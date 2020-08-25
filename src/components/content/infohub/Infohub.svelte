<script>
import { axios, animateScroll, localize } from 'utils/imports/core';
import { svelteLifecycleOnMount } from 'utils/imports/svelte';
import { Tagify } from 'utils/imports/plugins';
import { InfohubNews, InfohubCat, Spinner } from 'utils/imports/components';
import { infohubSections } from 'utils/imports/data';

import 'assets/style/infohub.scss';

let tags = [];
let tagList = '';
let tagify = null;
const sectionLoadingStates = [false, true, true, true, true];
let loading = true;

$: {
  loading = sectionLoadingStates.filter((el) => el === true).length > 0;
}

const searchIcon = infohubSections.filter((el) => el.type === 'filter')[0].icon;

function getTags() {
  axios.get('http://localhost:8080/v1/infoaggregates/discussiontags').then((response) => {
    tags = response.data;
    if (tagify !== null) {
      tagify.settings.whitelist.splice(0, tags.map((el) => el.term).length, ...tags.map((el) => el.term));
    }
  });
}

svelteLifecycleOnMount(() => {
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
      <div class="col-span-1 md:col-span-2">
        <span style="background-image: url({searchIcon});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10" id="filter">{$localize('infohub.filter')}</span>
      </div>
      <div class="col-span-1 md:col-span-2" id="discussionTagFilter">
        <input />
      </div>
      <InfohubNews 
        on:loading="{(event) => { sectionLoadingStates[1] = event.detail; }}"
      />
      {#if loading}
        <div class="col-span-1 md:col-span-2">
          <Spinner />
        </div>
      {/if}
      {#each infohubSections.filter((el) => el.type === 'cat') as section, i}
        <InfohubCat 
          apiEndpoint="{`/v1/infoaggregates/${section.id}`}"
          icon="{section.icon}"
          id="{section.id}"
          titleLocaleIdent="{`infohub.${section.id}`}"
          tags="{tagList}"
          on:loading="{(event) => { sectionLoadingStates[i + 2] = event.detail; }}"
          show="{!loading}"
          itemCount="{section.count}"
        />
      {/each}
    </div>
    <div class="col-span-1 hidden md:block">
        <div class="sticky sticky-right mx-auto" style="max-width: 48px;">
          {#each infohubSections as section, i}
            {#if sectionLoadingStates[i] !== null && !loading}
              <div class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1" style="background-image: url({section.icon});" on:click="{() => animateScroll.scrollTo({ element: `#${section.id}`, offset: -50 })}">
              </div>
            {/if}
          {/each}
        </div>
    </div>
</div>

<div class="menu-bottom bottom-0 left-0 w-full justify-between items-center flex fixed md:hidden h-12 z-20 bg-nwoun p-1">
  {#each infohubSections as section, i}
    {#if sectionLoadingStates[i] !== null && !loading}
      <div class="w-10">
        <div class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer" style="background-image: url({section.icon});" on:click="{() => animateScroll.scrollTo({ element: `#${section.id}`, offset: -50 })}">
        </div>
      </div>
    {/if}
  {/each}
</div>
