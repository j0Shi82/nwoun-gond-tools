<script>
import { formatDate, formatTime } from 'utils/imports/core';
import { Button, Icon } from 'utils/imports/components';

import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export let avatarSrc = null;
export let postData;

let bodyEl;
let overflow = false;
let showAll = false;

$: {
  if (bodyEl && bodyEl.scrollHeight !== bodyEl.clientHeight) overflow = true;
}

function visitForum(data) {
  const href = parseInt(data.comment_id, 10) !== 0 ? `https://forum.arcgames.com/neverwinter/discussion/comment/${data.comment_id}` : `https://forum.arcgames.com/neverwinter/discussion/${data.discussion_id}`;
  window.open(href);
}

function scrollToTop() {
  // if (window.scrollY > document.querySelector('#header').offsetHeight) {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
    left: 0,
  });
  // }
}
</script>

<style>
  .condensed {
    max-height: 10rem;
  }
</style>

<div class="flex flex-col md:flex-row items-center md:items-start rounded-md bg-red-700 p-2 my-2 border-2 border-black relative">
    <div class="absolute top-0 right-0 text-red-700 bg-black cursor-pointer border-b-4 border-l-4 border-red-700" on:click={scrollToTop} style="width:34px; height: 34px; border-bottom-left-radius: 100%;">
      <Icon data={faChevronUp} class="absolute" style="top: 3px; right:5px;" />
    </div>
    <div class="w-full md:w-auto flex-none flex md:flex-col md:mr-2">
      <div class="flex-none w-12 h-12 mx-auto rounded-full overflow-hidden border-black border-2">
        <img src="{avatarSrc !== '' ? avatarSrc : 'https://www.arcgames.com/images/account/user.jpg'}" alt="avatar" />
      </div>
      <div class="flex-auto flex flex-col justify-center">
        <div class="w-full md:w-32 text-sm font-bold text-center truncate">{postData.dev_name}</div>
        <div class="w-full text-center text-sm italic">{$formatDate(new Date(postData.timestamp * 1000))} {$formatTime(new Date(postData.timestamp * 1000))}</div>
      </div>
    </div>
    <div class="w-full flex-none md:flex-auto cursor-pointer">
        <div class="w-full border-black border-b-2 text-lg font-bold text-center md:text-left" on:click="{() => visitForum(postData)}">{postData.discussion_name}</div>
        <div bind:this="{bodyEl}" class="relative italic overflow-hidden" style="word-break: break-word;" class:condensed="{!showAll}">
            <div class="mt-2" on:click="{() => visitForum(postData)}">{@html postData.body}</div>
            {#if overflow && !showAll}
            <div class="absolute w-full bottom-0 pt-10 bg-gradient-to-t from-red-700 to-transparent">
                <div class="w-1/1 sm:w-1/2 md:w-1/4 float-right border-l-0 sm:border-l-8 border-t-8 border-red-700">
                  <Button colorClasses="border-black text-nwoun bg-black" text="Show More..." click="{() => { showAll = true; }}" />
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>