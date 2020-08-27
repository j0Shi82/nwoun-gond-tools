<script>
import { axios, localize } from 'utils/imports/core';
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
let validationErrors = {
  email: [],
  url: [],
  desc: [],
};
let generalError = false;
let success = false;

const send = () => {
  // check of ion progress
  if (sending) return;

  // reset all errors and states
  validationErrors = {
    email: [],
    url: [],
    desc: [],
  };
  generalError = false;
  sending = true;
  success = false;

  // do the request
  axios.post(`${apiServer}/v1/infohub/source`, {
    email, url, desc,
  })
    .then((response) => {
      console.log(response);
      // reset on successful transmission
      success = true;
      email = '';
      url = '';
      desc = '';
    })
    .catch((e) => {
      if (e?.response?.status === 400 && e?.response?.data?.success === false) {
        validationErrors = {
          email: [],
          url: [],
          desc: [],
          ...e.response.data.error,
        };
      } else {
        generalError = true;
      }
    })
    .finally(() => {
      sending = false;
    });
};
</script>

<div>
    <p>
        {$localize('infohub.sourceModal.info')}
    </p>
    <label class="block mt-2">
        <span>{$localize('infohub.sourceModal.labels.email')}</span><span class:hidden="{validationErrors.email.length === 0}" class="ml-2 error">{validationErrors.email[0]}</span>
        <input bind:value="{email}" type="email" name="email" class:error="{validationErrors.email.length > 0}" class="form-input mt-1 block w-full" placeholder="{$localize('infohub.sourceModal.placeholders.email')}">
    </label>
    <label class="block">
        <span>{$localize('infohub.sourceModal.labels.url')}</span><span class:hidden="{validationErrors.url.length === 0}" class="ml-2 error">{validationErrors.url[0]}</span>
        <input bind:value="{url}" type="text" name="url" class:error="{validationErrors.url.length > 0}" class="form-input mt-1 block w-full" placeholder="{$localize('infohub.sourceModal.placeholders.url')}">
    </label>
    <label class="block">
        <span>{$localize('infohub.sourceModal.labels.desc')}</span><span class:hidden="{validationErrors.desc.length === 0}" class="ml-2 error">{validationErrors.desc[0]}</span>
        <textarea bind:value="{desc}" type="email" name="desc" rows="3" class:error="{validationErrors.desc.length > 0}" class="form-textarea mt-1 block w-full" placeholder="{$localize('infohub.sourceModal.placeholders.desc')}"></textarea>
    </label>
</div>
<div class="mt-2 sm:flex sm:flex-row-reverse">
    <Button click="{send}" colorClasses="bg-black text-nwoun border-black" cssClasses="sm:w-20 sm:ml-2 sm:mb-0 ml-0 mb-2">
        {#if sending}
            <Icon data="{faSyncAlt}" spin />
        {:else}
        {$localize('infohub.sourceModal.buttons.send')}
        {/if}
    </Button>
    <Button click="{modalClose}" colorClasses="bg-gray-400 text-black border-gray-400">{$localize('infohub.sourceModal.buttons.cancel')}</Button>
</div>
{#if generalError}<div class="error mt-2 w-full text-center">Oops... look like something went wrong. Please try to send your request again!</div>{/if}
{#if success}<div class="success mt-2 w-full text-center">Thanks for your help. You may now close this window!</div>{/if}