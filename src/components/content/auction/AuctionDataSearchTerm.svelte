<script>
    import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
    import { Icon } from "utils/imports/components";
    import { localize } from "utils/imports/core";
    import { svelteCreateEventDispatcher } from "utils/imports/svelte";

    export let curSearchTerm = "";
    const dispatch = svelteCreateEventDispatcher();

    $: dispatch("change", {
        value: curSearchTerm,
    });
</script>

<div id="search" class="auction-tagify flex flex-grow mr-2">
    <tags
        class="tagify tagify--noTags tagify--empty h-12 bg-opacity-70 bg-gray-300"
        tabindex="-1"
        aria-expanded="false"
    >
        <span
            contenteditable=""
            on:input={(e) => {
                curSearchTerm = e.target.innerText;
            }}
            tabindex="0"
            data-placeholder={$localize("auction.search.a11y.placeholder")}
            aria-placeholder={$localize("auction.search.a11y.placeholder")}
            class="tagify__input"
            role="textbox"
            aria-autocomplete="both"
            aria-multiline="false">{curSearchTerm}</span
        >
        <div
            class="cursor-pointer right-1 top-1 absolute"
            on:keypress={() => {
                curSearchTerm = "";
            }}
            on:click={() => {
                curSearchTerm = "";
            }}
            class:invisible={curSearchTerm.length < 3}
        >
            <Icon data={faTimesCircle} scale={2} class="text-black mt-1" />
        </div>
    </tags>
</div>
