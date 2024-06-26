<script>
    import { Button, Icon } from "@/utils/imports/components";
    import { formatDate, formatTime, localize } from "@/utils/imports/core";

    import {
        faChevronUp,
        faSquarePlus,
    } from "@fortawesome/free-solid-svg-icons";

    export let avatarSrc = null;
    export let postData;

    let bodyEl;
    let overflow = false;
    let showAll = false;

    $: {
        if (bodyEl && bodyEl.scrollHeight !== bodyEl.clientHeight)
            overflow = true;
    }

    function visitForum(data) {
        let href;
        if (parseInt(data.category_id, 10) === 5555) {
            const discussionId = data.discussion_id.replace(/^t[1-3]_/, "");
            const commentId = data.comment_id.replace(/^t1_/, "");
            // reddit
            href = commentId
                ? `https://www.reddit.com/r/Neverwinter/comments/${discussionId}/comment/${commentId}`
                : `https://www.reddit.com/r/Neverwinter/comments/${discussionId}`;
        } else {
            // arc
            href =
                parseInt(data.comment_id, 10) !== 0
                    ? `https://forum.arcgames.com/neverwinter/discussion/comment/${data.comment_id}`
                    : `https://forum.arcgames.com/neverwinter/discussion/${data.discussion_id}`;
        }
        window.open(href);
    }

    function scrollToTop() {
        // if (window.scrollY > document.querySelector('#header').offsetHeight) {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
            left: 0,
        });
        // }
    }
</script>

<div
    class="rounded-md p-2 my-2 border border-nwoun relative bg-gray-300 bg-opacity-70"
>
    <div class="flex flex-col md:flex-row items-center md:items-start">
        <div
            class="absolute top-0 right-0 text-black bg-nwoun cursor-pointer border-b-4 border-l-4 border-gray-300"
            on:keypress={scrollToTop}
            on:click={scrollToTop}
            style="width:34px; height: 34px; border-bottom-left-radius: 100%;"
        >
            <Icon
                data={faChevronUp}
                class="absolute"
                style="top: 3px; right:5px;"
            />
        </div>
        <div class="w-full md:w-auto flex-none flex md:flex-col md:mr-2">
            <div
                class="flex-none w-12 h-12 mx-auto rounded-full overflow-hidden"
            >
                <img
                    src={avatarSrc !== ""
                        ? avatarSrc
                        : "https://www.arcgames.com/images/account/user.jpg"}
                    alt="avatar"
                />
            </div>
            <div
                class="flex-auto flex flex-col justify-center ml-2 md:ml-0 md:text-center"
            >
                <div
                    class="w-full md:w-32 text-sm font-bold truncate md:text-center"
                >
                    {postData.dev_name}
                </div>
                <div class="w-full text-sm italic">
                    {$formatDate(new Date(postData.timestamp * 1000))}
                    {$formatTime(new Date(postData.timestamp * 1000))}
                </div>
            </div>
        </div>
        <div class="w-full flex-none md:flex-auto cursor-pointer">
            <div
                class="w-full border-black border-b text-lg font-bold text-center md:text-left"
                on:keypress={() => visitForum(postData)}
                on:click={() => visitForum(postData)}
            >
                {postData.discussion_name}
            </div>
            <div
                bind:this={bodyEl}
                class="relative italic overflow-hidden"
                style="word-break: break-word;"
                class:condensed={!showAll}
            >
                <div
                    class="mt-2"
                    on:keypress={() => visitForum(postData)}
                    on:click={() => visitForum(postData)}
                >
                    {@html postData.body}
                </div>
                {#if overflow && !showAll}
                    <div
                        class="absolute w-full bottom-0 pt-16 bg-gradient-to-t from-gray-300 to-transparent"
                    >
                        <!-- <div
                        class="w-1/1 sm:w-1/2 md:w-1/6 float-right border-l-0 sm:border-l-8 border-t-8 border-gray-300"
                    >
                        <Button
                            colorClasses="border-nwoun text-black bg-nwoun"
                            text="Show Full Post..."
                            click={() => {
                                showAll = true;
                            }}
                        />
                    </div> -->
                    </div>
                {/if}
            </div>
        </div>
    </div>
    {#if overflow && !showAll}
        <div
            class="px-2 py-1 bg-nwoun absolute bottom-0 left-0 text-center rounded-tr-lg select-none cursor-pointer flex items-center"
            on:click={() => (showAll = true)}
            on:keypress={() => (showAll = true)}
        >
            <Icon data={faSquarePlus} />
            <span class="ml-2 font-bold"
                >{$localize("devtracker.posts.expand")}</span
            >
        </div>
    {/if}
</div>

<style>
    .condensed {
        max-height: 10rem;
    }
</style>
