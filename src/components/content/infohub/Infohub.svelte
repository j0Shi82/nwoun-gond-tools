<script>
    import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

    import faChevronUp from "@/assets/media/fontawesome/chevron-up.svg";
    import { Icon, InfohubArticles } from "@/utils/imports/components";
    import { localize } from "@/utils/imports/core";
    import { infohubSections } from "@/utils/imports/data";
    import { makeApiCall } from "@/utils/imports/helpers";
    import {
        currentRouteQuerystring,
        infohubFirstloadError,
        infohubTags,
        infohubWhoamiTagId,
    } from "@/utils/imports/store";
    import { svelteLifecycleOnMount } from "@/utils/imports/svelte";

    import "@/assets/style/infohub.scss";

    // get types and site from query string and set them as active
    const qs = new URLSearchParams($currentRouteQuerystring);
    const articleSections = infohubSections.filter(
        (el) => el.type === "articles",
    );
    const sectionStates = articleSections.map(
        (el) =>
            qs.has("types") &&
            qs.get("types").split(",").includes(el.id) &&
            ((qs.has("sites") &&
                qs.get("sites").split(",").includes(el.site)) ||
                el.site === null),
    );
    // reactive types array that gets types and site from section data for the api call
    $: types = sectionStates
        .map((el, i) => (el ? articleSections[i].id : false))
        .filter((el) => el !== false && el !== null)
        .reduce(
            (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
            [],
        )
        .join(",");
    $: sites = sectionStates
        .map((el, i) => (el ? articleSections[i].site : false))
        .filter((el) => el !== false && el !== null)
        .reduce(
            (unique, item) =>
                unique.includes(item) ? unique : [...unique, item],
            [],
        )
        .join(",");
    // clicking the types array will change the sectionStates array
    const handleSectionStates = (index) => {
        sectionStates[index] = !sectionStates[index];
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    // tag list logic, get tags from query string
    let tagList = qs.has("tags")
        ? qs
              .get("tags")
              .split(",")
              .map((el) => parseInt(el, 10))
        : [];
    if ($infohubWhoamiTagId !== null) {
        tagList.push($infohubWhoamiTagId);
    }
    let loading = true;
</script>

<div class="grid md:grid-cols-12 grid-cols-11 gap-2 pb-12 md:pb-0">
    <div class="grid grid-cols-1 md:grid-cols-2 col-span-11 gap-2">
        {#if !$infohubFirstloadError}
            <InfohubArticles
                tags={tagList}
                {types}
                {sites}
                canMount={true}
                on:loading={(e) => {
                    loading = e.detail.state;
                }}
            />
        {:else}
            <div class="col-span-1 md:col-span-2">
                <div
                    class="w-full p-2 rounded-md font-bold flex justify-center items-center"
                >
                    <Icon
                        data={faExclamationTriangle}
                        scale={2}
                        class="text-nwoun pr-2 flex-shrink-0"
                    />
                    <span class="text-nwoun"
                        >{$localize("errors.catError")}</span
                    >
                </div>
            </div>
        {/if}
    </div>
    <div
        class="{loading
            ? 'pointer-events-none opacity-50 '
            : ''}col-span-1 hidden md:block user-select-none"
    >
        <div class="sticky sticky-right mx-auto" style="max-width: 48px;">
            <div
                class="border-black pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1"
                style="background-image: url({faChevronUp});"
                on:keypress={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                on:click={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            />
            <div class="my-4" />
            {#each articleSections as section, i}
                <div
                    class:opacity-25={!sectionStates[i]}
                    class="pb-1/1 w-full bg-contain bg-center bg-no-repeat cursor-pointer mb-1"
                    style="background-image: url({section.icon});"
                    on:keypress={() => handleSectionStates(i)}
                    on:click={() => handleSectionStates(i)}
                />
            {/each}
        </div>
    </div>
</div>
<div
    class="{loading
        ? 'pointer-events-none opacity-50 '
        : ''}menu-bottom bottom-0 left-0 w-full justify-between items-center flex fixed md:hidden h-12 z-20 bg-nwoun px-2 user-select-none"
>
    <div class="w-10">
        <div
            class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer"
            style="background-image: url({faChevronUp});"
            on:keypress={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
            on:click={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        />
    </div>
    <div class="mx-4 h-3/4 flex-0" />
    {#each articleSections as section, i}
        <div class="w-6">
            <div
                class:opacity-25={!sectionStates[i]}
                class="pb-1/1 bg-contain bg-center bg-no-repeat cursor-pointer"
                style="background-image: url({section.icon});"
                on:keypress={() => {
                    handleSectionStates(i);
                }}
                on:click={() => {
                    handleSectionStates(i);
                }}
            />
        </div>
    {/each}
</div>

<style lang="scss">
    .sticky-right {
        top: calc(theme("height.16") + theme("padding.2"));
    }

    .menu-bottom {
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.75);
    }

    .disabled {
        @apply opacity-30;
    }
</style>
