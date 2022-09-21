<script>
import { svelteCreateEventDispatcher } from 'utils/imports/svelte';
import { localize } from 'utils/imports/core';

export let curCategory = '';
export let categories = [];
const dispatch = svelteCreateEventDispatcher();

$: dispatch('change', {
  value: curCategory,
});
</script>

<div>
  <select bind:value="{curCategory}" class="block w-full form-select bg-gray-300 border-black border-2 rounded-md bg-opacity-50 font-bold text-black h-12" id="grid-state" style="max-width: 160px; width: 160px">
    <option value="">{ $localize('auction.search.categorySelect') }</option>
    {#each categories.sort() as cat}
      <option value="{cat}" selected={ curCategory === cat ? 'selected' : ''}>{cat}</option>
    {/each}
  </select>
</div>