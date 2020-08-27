<script>
import { localize } from 'utils/imports/core';
import { homeGallery } from 'utils/imports/data';
</script>

<style lang="scss">
  p {
    @apply mb-2 rounded-md;

    &.gray {
      @apply bg-gray-300 bg-opacity-50 p-2;
    }
  }
</style>

<p class="gray">{@html $localize('home.p1')}</p>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
  {#each homeGallery.filter((el, i) => i < 4) as image }
  <div class="pb-2/3 cursor-pointer bg-no-repeat bg-contain bg-center" style="background-image: url({image.thumb});" on:click="{() => { window.open(image.full); }}"></div>
  {/each}
</div>
<p class="gray">
  {@html $localize('home.p2')}
  <br />
  <br />
  {@html $localize('home.p3')}
  <br />
  <br />
  {@html $localize('home.p4')}
</p>
<p class="text-lg font-bold text-center bg-transparent">{@html $localize('home.p6')}</p>
<p class="text-lg italic font-bold text-center bg-transparent">{@html $localize('home.p7')}</p>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  {#each homeGallery.filter((el, i) => i >= 4) as image }
  <div class="pb-2/3 cursor-pointer bg-no-repeat bg-contain bg-center" style="background-image: url({image.thumb});" on:click="{() => { window.open(image.full); }}"></div>
  {/each}
</div>