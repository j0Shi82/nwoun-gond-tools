<script>
import { axios } from 'utils/imports/core';
import { svelteGetContext } from 'utils/imports/svelte';
import { apiServer } from 'utils/imports/config';
import { Button, Icon } from 'utils/imports/components';

import {
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

const { modalClose } = svelteGetContext('modal');

let email = '';
let url = '';
let desc = '';
let sending = false;

const send = () => {
  sending = true;
  axios.post(`${apiServer}/v1/infohub/source`, {
    email, url, desc,
  })
    .then((response) => {
      console.log(response);
    })
    .catch(() => {})
    .finally(() => {
      sending = false;
    });
};
</script>

<div>
    <p>
        Help us create the most comprehensive list of Neverwinter articles, discussions, social posts, and media by adding sources that you feel aren't included in our engine. Please include a direct link to the content, channel, or feed that you would like us to crawl. Otherwise make sure to add a detailed description of what you'd like to have included.
    </p>
    <label class="block mt-2">
        <span>E-Mail *</span>
        <input bind:value="{email}" type="email" name="email" class="form-input mt-1 block w-full" placeholder="john@example.com">
    </label>
    <label class="block">
        <span>URL *</span>
        <input bind:value="{url}" type="text" name="url" class="form-input mt-1 block w-full" placeholder="https://www.homepage.com/neverwinter.rss">
    </label>
    <label class="block">
        <span>Description</span>
        <textarea bind:value="{desc}" type="email" name="desc" rows="3" class="form-textarea mt-1 block w-full" placeholder="Please enter additional info if possible"></textarea>
    </label>
</div>
<div class="mt-2 sm:flex sm:flex-row-reverse">
    <Button click="{send}" colorClasses="bg-black text-nwoun border-black" cssClasses="sm:w-20 sm:ml-2 sm:mb-0 ml-0 mb-2">
        {#if sending}
            <Icon data="{faSyncAlt}" spin />
        {:else}
            Send
        {/if}
    </Button>
    <Button click="{modalClose}" colorClasses="bg-gray-400 text-black border-gray-400">Cancel</Button>
</div>