<script>
    import { Icon, Spinner } from "@/utils/imports/components";
    import { localize } from "@/utils/imports/core";
    import { makeApiCall } from "@/utils/imports/helpers";
    import { svelteLifecycleOnMount } from "@/utils/imports/svelte";
    import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

    let crawlEngineData = null;
    let patreonData = [];
    $: fetching = crawlEngineData === null || patreonData.length === 0;
    $: crawlActive = !fetching && crawlEngineData.isActive;
    $: crawlInactive = !fetching && !crawlEngineData.isActive;
    $: hasPetreons =
        patreonData.reduce((aggr, cur) => {
            // eslint-disable-next-line no-param-reassign
            aggr += cur?.members?.length ?? 0;
            return aggr;
        }, 0) > 0;

    $: localizeOptions = {
        values: {
            itemsPerDay: parseInt(crawlEngineData?.itemsPerDay, 10),
            totalItems: parseInt(crawlEngineData?.totalItems, 10),
            percentage: (
                (parseInt(crawlEngineData?.itemsPerDay, 10) /
                    parseInt(crawlEngineData?.totalItems, 10)) *
                100
            ).toFixed(2),
        },
    };

    svelteLifecycleOnMount(async () => {
        crawlEngineData = await makeApiCall({
            type: "auctions/engine",
            returnData: true,
        });

        patreonData = await makeApiCall({
            type: "auctions/patreon",
            returnData: true,
        });
    });
</script>

<div class="mb-2 bg-gray-300 bg-opacity-70">
    <div
        class="p-2 border rounded-lg"
        class:border-green-700={crawlActive}
        class:border-red-700={!crawlActive}
        class:border-gray-700={fetching}
    >
        <div class="flex items-center justify-center">
            {#if crawlActive}
                <Icon
                    data={faCircleCheck}
                    scale={2}
                    class="text-green-700 mr-2 flex-none w-8"
                />
                <div>
                    {@html $localize("auction.engine.up.data", localizeOptions)}
                </div>
            {/if}
            {#if crawlInactive}
                <Icon
                    data={faBan}
                    scale={2}
                    class="text-red-700 mr-2 flex-none w-8"
                />
                <div>
                    {@html $localize(
                        "auction.engine.down.data",
                        localizeOptions,
                    )}
                </div>
            {/if}
            {#if fetching}
                <Spinner
                    scaleClasses="h-8 w-8 flex-0"
                    style="width: 2rem; margin-right: 0.5rem;"
                />
                <div class="text-center">
                    {$localize("auction.engine.loading.data")}
                </div>
            {/if}
        </div>
        <div class="mt-2">
            <div class="text-center font-bold text-base text-nwoun underline">
                <a
                    href="https://www.patreon.com/nw_gond_tools"
                    target="_blank"
                    rel="noreferrer"
                >
                    {#if crawlActive}
                        {$localize("auction.engine.up.help")}
                    {/if}
                    {#if crawlInactive}
                        {$localize("auction.engine.down.help")}
                    {/if}
                    {#if fetching}
                        {$localize("auction.engine.loading.help")}
                    {/if}
                </a>
            </div>
        </div>
        {#if hasPetreons}
            <div class="patreons">
                {#each patreonData as tier, i}
                    {#if tier.members.length}<div class="tier tier-{i}">
                            {tier.members
                                .map((member) => member.name)
                                .sort()
                                .join(", ")}
                        </div>{/if}
                {/each}
            </div>
            <div class="text-center w-full italic">
                {$localize("auction.engine.patreons.mention")}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .patreons {
        @apply flex justify-center items-center flex-wrap mt-2;

        .tier-1,
        .tier-2,
        .tier-3,
        .tier-4 {
            @apply font-bold px-3 py-2 inline-block rounded-full;
        }

        .tier + .tier {
            @apply ml-2;
        }
    }
    .tier-1 {
        @apply bg-blue-500 font-bold p-2;
    }

    .tier-2 {
        @apply bg-purple-500 font-bold p-2;
    }

    .tier-3 {
        @apply bg-yellow-500 font-bold p-2;
    }

    .tier-4 {
        @apply font-bold p-2;
        background-color: cyan;
    }
</style>
