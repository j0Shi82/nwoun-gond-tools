<script>
    import { appBackgroundOverlayActive } from "@/utils/imports/store";
    import {
        svelteCreateEventDispatcher,
        svelteLifecycleOnDestroy,
    } from "@/utils/imports/svelte";

    let background;
    const dispatch = svelteCreateEventDispatcher();

    $: {
        if ($appBackgroundOverlayActive) {
            document.querySelector("html").classList.add("scroll-off");
            document.querySelector("body").classList.add("scroll-off");
        } else {
            document.querySelector("html").classList.remove("scroll-off");
            document.querySelector("body").classList.remove("scroll-off");
        }
    }

    svelteLifecycleOnDestroy(() => {
        document.querySelector("html").classList.remove("scroll-off");
        document.querySelector("body").classList.remove("scroll-off");
    });

    const handleOuterClick = (e) => {
        if (e.target === background) {
            //   event.preventDefault();
            dispatch("click", e);
        }
    };
</script>

{#if $appBackgroundOverlayActive}
    <div class="fixed inset-0 transition-opacity z-50 overflow-y-auto">
        <div
            bind:this={background}
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 inset-0 bg-gray-600 bg-opacity-75"
            on:keypress={handleOuterClick}
            on:click={handleOuterClick}
        >
            <slot></slot>
        </div>
    </div>
{/if}
