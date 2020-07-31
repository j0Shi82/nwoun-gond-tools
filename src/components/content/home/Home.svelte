<script>
import { localize } from 'utils/imports/core';
import { images } from 'utils/imports/data';
</script>

<style lang="scss">
  p {
    @apply mb-2;
  }
</style>

<p>{@html $localize('home.p1')}</p>
<img src="{images.googleAnalytics}" alt="Neverwinter:Uncensored usage numbers" class="mx-auto my-2 w-full md:w-3/5 h-auto" />
<p>{@html $localize('home.p2')}</p>
<p>{@html $localize('home.p3')}</p>
<p>{@html $localize('home.p4')}</p>
<p>{@html $localize('home.p6')}</p>
<p>{@html $localize('home.p7')}</p>