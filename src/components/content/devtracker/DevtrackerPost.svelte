<script>
import { formatDate, formatTime } from 'utils/imports/core';
import { Button } from 'utils/imports/components';

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
</script>

<style>
  .condensed {
    max-height: 12rem;
  }
</style>

<div class="flex flex-col md:flex-row items-center md:items-start rounded-md bg-red-700 p-2 m-2">
    <div class="w-full md:w-auto flex-none flex md:flex-col md:mr-2">
      <div class="flex-none w-12 h-12 md:w-32 md:h-32 rounded-full overflow-hidden border-black border-2">
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
            <div on:click="{() => visitForum(postData)}">{@html postData.body}</div>
            {#if overflow && !showAll}
            <div class="absolute w-full bottom-0">
                <Button text="Show More..." click="{() => { showAll = true; }}" />
            </div>
            {/if}
        </div>
    </div>
</div>