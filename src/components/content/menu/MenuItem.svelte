<script>
    import { Icon } from "@/utils/imports/components";
    import {
        getLocalizedRouteMatcher,
        localize,
        routerLocalizedPush,
    } from "@/utils/imports/core";
    import { currentRouteLocation } from "@/utils/imports/store";

    export let id;
    export let mobile = false;
    export let icon;
    export let textLocaleKey;
    export let linkType = "external";
    export let link;
    export let condensed = false;
    export let flexAuto = true;

    const scale = condensed ? "2" : "1";

    const mobileClasses =
        "flex justify-center lg:hidden h-full items-center cursor-pointer hover:underline pl-2 pr-3";
    const desktopClasses =
        "hidden lg:flex justify-start h-full items-center cursor-pointer hover:underline pl-2 pr-3";
    const condensedClasses = "hover:rounded-full";

    function linkClick() {
        if (linkType === "external") {
            window.open(link);
        }

        if (
            linkType === "internal" &&
            !$currentRouteLocation.match(getLocalizedRouteMatcher(link))
        ) {
            routerLocalizedPush(link);
        }
    }
</script>

<div
    {id}
    class:flex-auto={flexAuto}
    class:active={$currentRouteLocation.match(getLocalizedRouteMatcher(link))}
    class:condensed
    class="{mobile ? mobileClasses : desktopClasses} {condensed
        ? condensedClasses
        : ''} menu-item"
    on:keypress={linkClick}
    on:click={linkClick}
>
    <Icon data={icon} {scale} class="w-8" />
    {#if !condensed}<span class="text-xl font-bold"
            >{$localize(textLocaleKey)}</span
        >{/if}
</div>

<style lang="scss">
    .menu-item.active {
        @apply underline;

        &.condensed {
            @apply rounded-full;
        }
    }
</style>
