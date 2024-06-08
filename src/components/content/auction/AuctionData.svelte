<script>
    import {
        faExclamationTriangle,
        faGem,
        faMinus,
        faPlus,
    } from "@fortawesome/free-solid-svg-icons";

    import {
        AuctionDataEngineInfo,
        AuctionDataSearchCatSelect,
        AuctionDataSearchDatePicker,
        AuctionDataSearchQualitySelect,
        Button,
        Icon,
        Spinner,
        StandardError,
    } from "@/utils/imports/components";
    import { localize, routerLocalizedPush } from "@/utils/imports/core";
    import {
        buildQueryStrings,
        dateFormat,
        dateFormatRelative,
        makeApiCall,
    } from "@/utils/imports/helpers";
    import { getAuctionChart } from "@/utils/imports/plugins";
    import { currentRouteQuerystring } from "@/utils/imports/store";
    import { svelteLifecycleOnMount } from "@/utils/imports/svelte";

    const qs = new URLSearchParams($currentRouteQuerystring);
    const charts = {};
    const chartData = {};
    let loading = true;
    let error = false;
    let itemData = [];
    let pickerStartDate = qs.get("start") ? new Date(qs.get("start")) : null;
    let pickerEndDate = qs.get("end") ? new Date(qs.get("end")) : null;
    let openItemDef = qs.get("open") || null;
    let curPage = parseInt(qs.get("page"), 10) || 0;
    let curCategory = qs.get("cat") || "";
    let curQuality = qs.get("quality") || "";
    let curSearchTerm = qs.get("s") || "";

    $: filteredData = itemData
        .filter(
            (el) =>
                (curSearchTerm.length < 3 ||
                    RegExp(curSearchTerm, "i").test(el.itemName)) &&
                (curCategory === "" ||
                    (el.categories && el.categories.includes(curCategory))) &&
                (curQuality === "" ||
                    (el.quality && el.quality === curQuality)),
        )
        .filter((el, i) => i >= curPage * 10 && i < 10 * (curPage + 1));

    $: curResultsCount = itemData.filter(
        (el) =>
            (curSearchTerm.length < 3 ||
                RegExp(curSearchTerm, "i").test(el.itemName)) &&
            (curCategory === "" ||
                (el.categories && el.categories.includes(curCategory))) &&
            (curQuality === "" || (el.quality && el.quality === curQuality)),
    ).length;

    $: categories = itemData.reduce((aggr, cur) => {
        if (!cur.categories) return aggr;
        cur.categories.forEach((el) => {
            if (!aggr.includes(el)) aggr.push(el);
        });
        return aggr;
    }, []);

    $: queryStringData = [
        {
            element: openItemDef,
            type: "value",
            comp: openItemDef !== null,
            name: "open",
        },
        {
            element: curSearchTerm,
            type: "value",
            comp: curSearchTerm.length > 2,
            name: "s",
        },
        {
            element: curCategory,
            type: "value",
            comp: curCategory !== "",
            name: "cat",
        },
        {
            element: curQuality,
            type: "value",
            comp: curQuality !== "",
            name: "quality",
        },
        {
            element: curPage,
            type: "value",
            comp: curPage !== 0,
            name: "page",
        },
        {
            element: dateFormat(pickerStartDate || new Date(), "yyyy-MM-dd"),
            type: "value",
            comp: pickerStartDate !== null,
            name: "start",
        },
        {
            element: dateFormat(pickerEndDate || new Date(), "yyyy-MM-dd"),
            type: "value",
            comp: pickerEndDate !== null,
            name: "end",
        },
    ];

    function getDetailData(itemDef) {
        if (chartData[itemDef])
            return Promise.resolve({ data: chartData[itemDef] });
        return makeApiCall({
            type: "auctions/itemdetails",
            params: {
                itemDef,
            },
            returnData: false,
        });
    }

    function toggleChart(itemDef) {
        if (typeof charts[openItemDef] !== "undefined") {
            charts[openItemDef].destroy();
            charts[openItemDef] = undefined;
        }
        if (chartData[itemDef] === false) {
            chartData[itemDef] = undefined;
        }
        if (openItemDef === itemDef) {
            openItemDef = null;
        } else {
            openItemDef = itemDef;
            if (typeof charts[openItemDef] === "undefined") {
                getDetailData(itemDef)
                    .then(({ data: detailData }) => {
                        chartData[itemDef] = detailData;
                        charts[openItemDef] = getAuctionChart(
                            `Chart_${openItemDef}`,
                            detailData.filter(
                                (el) =>
                                    (pickerStartDate === null ||
                                        new Date(el.insertedDate) >=
                                            pickerStartDate) &&
                                    (pickerEndDate === null ||
                                        new Date(el.insertedDate) <=
                                            pickerEndDate),
                            ),
                            itemData.find((el) => el.itemDef === itemDef)
                                .quality,
                        );
                        charts[openItemDef].resize();
                    })
                    .catch((e) => {
                        console.log(e);
                        chartData[itemDef] = false;
                    });
            }
        }
    }

    const closeOpenChart = () => {
        if (openItemDef !== null) toggleChart(openItemDef);
    };
    const resetPage = () => {
        curPage = 0;
    };
    const searchParamChange = () => {
        closeOpenChart();
        resetPage();
    };

    $: routerLocalizedPush("auction", {
        queryString: buildQueryStrings(queryStringData),
    });

    function getItemData() {
        loading = true;
        makeApiCall({
            type: "auctions/items",
            timeout: 10000,
            params: {
                start: pickerStartDate
                    ? dateFormat(pickerStartDate, "yyyy-MM-dd")
                    : "1970-01-01",
                end: pickerEndDate
                    ? dateFormat(pickerEndDate, "yyyy-MM-dd")
                    : "2070-01-01",
            },
            returnData: false,
        })
            .then((response) => {
                itemData = response.data;
            })
            .catch(() => {
                error = true;
            })
            .finally(() => {
                loading = false;
                if (openItemDef !== null) {
                    if (typeof charts[openItemDef] === "undefined") {
                        getDetailData(openItemDef)
                            .then(({ data: detailData }) => {
                                chartData[openItemDef] = detailData;
                                charts[openItemDef] = getAuctionChart(
                                    `Chart_${openItemDef}`,
                                    detailData.filter(
                                        (el) =>
                                            (pickerStartDate === null ||
                                                new Date(el.insertedDate) >=
                                                    pickerStartDate) &&
                                            (pickerEndDate === null ||
                                                new Date(el.insertedDate) <=
                                                    pickerEndDate),
                                    ),
                                    itemData.find(
                                        (el) => el.itemDef === openItemDef,
                                    ).quality,
                                );
                                charts[openItemDef].resize();
                            })
                            .catch(() => {
                                chartData[openItemDef] = false;
                            });
                    }
                }
            });
    }

    svelteLifecycleOnMount(async () => {
        getItemData();
    });
</script>

{#if error}
    <StandardError />
{:else}
    <AuctionDataEngineInfo />
    <div class="flex justify-between items-center mb-2">
        <AuctionDataSearchCatSelect
            bind:curCategory
            bind:categories
            on:change={searchParamChange}
        />
    </div>
    <div class="flex justify-between items-center mb-2">
        <AuctionDataSearchDatePicker
            bind:pickerStartDate
            bind:pickerEndDate
            on:change={(e) => {
                const curQs = new URLSearchParams($currentRouteQuerystring);
                const curQsStartDate = curQs.get("start") ?? null;
                const curQsEndDate = curQs.get("end") ?? null;
                const newStartDate = e.detail.start
                    ? dateFormat(e.detail.start, "yyyy-MM-dd")
                    : null;
                const newEndDate = e.detail.end
                    ? dateFormat(e.detail.end, "yyyy-MM-dd")
                    : null;
                if (
                    curQsEndDate !== newEndDate ||
                    curQsStartDate !== newStartDate
                ) {
                    searchParamChange();
                    getItemData();
                }
            }}
        />
        <AuctionDataSearchQualitySelect
            bind:curQuality
            on:change={searchParamChange}
        />
    </div>
    {#if !loading}
        <div class="flex flex-col">
            <div>
                <div class="align-middle inline-block min-w-full">
                    <div
                        class="shadow overflow-hidden border-nwoun border rounded-md"
                    >
                        <table class="min-w-full divide-y divide-black">
                            <thead class="bg-gray-300 bg-opacity-70">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-1 py-1 text-left font-bold text-lg uppercase tracking-wider"
                                    >
                                        Item
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-1 py-1 font-bold text-lg uppercase tracking-wider text-right"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        class="hidden md:table-cell px-1 py-1 font-bold text-lg uppercase tracking-wider text-right"
                                    >
                                        Count
                                    </th>
                                    <th
                                        scope="col"
                                        class="hidden md:table-cell px-1 py-1 font-bold text-lg uppercase tracking-wider text-right"
                                    >
                                        Updated
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-black">
                                {#each filteredData as data, i}
                                    <tr
                                        id={data.itemDef}
                                        class="item-row {data.quality}"
                                    >
                                        <td
                                            class="px-1 py-1 truncate item-name"
                                        >
                                            <div
                                                class="cursor-pointer w-4 inline-block mr-1"
                                                on:keypress={toggleChart(
                                                    data.itemDef,
                                                )}
                                                on:click={toggleChart(
                                                    data.itemDef,
                                                )}
                                            >
                                                {#if openItemDef === data.itemDef}
                                                    <Icon
                                                        data={faMinus}
                                                        scale="1.5"
                                                        class="text-black"
                                                    />
                                                {:else}
                                                    <Icon
                                                        data={faPlus}
                                                        scale="1.5"
                                                        class="text-black"
                                                    />
                                                {/if}
                                            </div>
                                            {data.itemName}
                                        </td>
                                        <td
                                            class="px-1 py-1 whitespace-nowrap text-right item-price"
                                        >
                                            {Intl.NumberFormat().format(
                                                data.low,
                                            )}
                                            <Icon
                                                data={faGem}
                                                scale="1.5"
                                                class="text-black"
                                            />
                                        </td>
                                        <td
                                            class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell item-count"
                                        >
                                            {Intl.NumberFormat().format(
                                                data.count,
                                            )}
                                        </td>
                                        <td
                                            class="px-1 py-1 whitespace-nowrap text-right hidden md:table-cell item-date"
                                        >
                                            {dateFormatRelative(
                                                new Date(data.inserted * 1000),
                                                new Date(),
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        class="item-row {data.quality}"
                                        class:hidden={openItemDef !==
                                            data.itemDef}
                                    >
                                        <td colspan="5" class="relative">
                                            {#if chartData[openItemDef] === false}
                                                <div
                                                    class="absolute top-0 left-0 w-full p-2 rounded-md font-bold flex justify-center items-center"
                                                    style="height: 400px"
                                                >
                                                    <Icon
                                                        data={faExclamationTriangle}
                                                        scale={2}
                                                        class="text-nwoun flex-shrink-0 pr-2"
                                                    />
                                                    <span class="text-nwoun"
                                                        >{$localize(
                                                            "errors.catError",
                                                        )}</span
                                                    >
                                                </div>
                                            {:else if typeof charts[openItemDef] === "undefined"}
                                                <Spinner
                                                    style="position: absolute; height: 400px;"
                                                />
                                            {/if}
                                            <div
                                                style="position: relative; height: 400px;"
                                                class="flex justify-center items-center"
                                            >
                                                <canvas
                                                    id={`Chart_${data.itemDef}`}
                                                    class:hidden={charts[
                                                        openItemDef
                                                    ] === "undefined"}
                                                />
                                            </div>
                                            <div />
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="pages" class="my-2 flex justify-between">
            <Button
                text="&lt;&lt; {$localize('auction.search.buttons.prev')}"
                colorClasses="border-nwoun bg-gray-300 bg-opacity-70 text-black"
                borderSize="1"
                invisible={curPage < 1}
                click={() => {
                    closeOpenChart();
                    curPage -= 1;
                }}
            />
            {#if curResultsCount > 10 * (curPage + 1)}<Button
                    text="{$localize('auction.search.buttons.next')} &gt;&gt;"
                    colorClasses="border-nwoun bg-gray-300 bg-opacity-70 text-black"
                    borderSize="1"
                    click={() => {
                        closeOpenChart();
                        curPage += 1;
                    }}
                />{/if}
        </div>
    {:else}
        <Spinner />
    {/if}
{/if}

<style lang="scss">
    .item-row {
        .item-name {
            @apply font-bold;
        }

        &.White,
        &.Common {
            @apply bg-gray-100;
        }

        &.Green,
        &.Uncommon {
            @apply bg-green-500 bg-opacity-50;
        }

        &.Blue,
        &.Rare {
            @apply bg-blue-500 bg-opacity-50;
        }

        &.Purple,
        &.Epic {
            @apply bg-purple-500 bg-opacity-50;
        }

        &.Orange,
        &.Legendary {
            @apply bg-yellow-500 bg-opacity-50;
        }

        &.Mythic,
        &.Teal {
            @apply bg-cyan-300 bg-opacity-50;
        }
    }

    td {
        &.truncate {
            max-width: calc(85vw - 125px);

            @screen md {
                max-width: calc(85vw - 125px - 80px - 235px);
            }
        }

        &.item-price {
            width: 125px;
            min-width: 125px;
            max-width: 125px;
        }

        &.item-count {
            width: 80px;
            min-width: 80px;
            max-width: 80px;
        }

        &.item-date {
            width: 235px;
            min-width: 235px;
            max-width: 235px;
        }
    }

    canvas {
        max-height: 400px !important;
    }
</style>
