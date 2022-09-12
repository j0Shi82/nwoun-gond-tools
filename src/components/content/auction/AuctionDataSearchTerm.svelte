<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import faSearch from 'assets/media/fontawesome/search.svg';
import { Icon } from 'utils/imports/components';
import { localize } from 'utils/imports/core';

export let curSearchTerm = '';
let searchElement = null
</script>

<div id="search" class="auction-tagify flex flex-grow mr-2">
    <span style="background-image: url({faSearch});" class="font-bold text-2xl bg-no-repeat bg-contain pl-10 mr-1" id="filter"></span>
    <tags class="tagify tagify--noTags tagify--empty" tabindex="-1" aria-expanded="false">
      <span contenteditable="" bind:this={searchElement} on:input={(e) => { curSearchTerm = e.target.innerText; } } tabindex="0" data-placeholder="{ $localize('auction.search.a11y.placeholder') }" aria-placeholder="{ $localize('auction.search.a11y.placeholder') }" class="tagify__input" role="textbox" aria-autocomplete="both" aria-multiline="false">{ curSearchTerm }</span>
      <div class="cursor-pointer right-1 top-1 absolute" on:click={() => { curSearchTerm = '' }} class:invisible={curSearchTerm.length < 3}>
        <Icon data="{faTimesCircle}" scale="{2}" class="text-black"></Icon>
      </div>
    </tags>
</div>