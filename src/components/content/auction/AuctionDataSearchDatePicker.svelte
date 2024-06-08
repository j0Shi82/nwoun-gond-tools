<script>
    import { Icon } from "@/utils/imports/components";
    import { localize } from "@/utils/imports/core";
    import { Easepick } from "@/utils/imports/plugins";
    import {
        svelteCreateEventDispatcher,
        svelteLifecycleOnMount,
    } from "@/utils/imports/svelte";
    import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

    export let pickerStartDate;
    export let pickerEndDate;
    let pickerStartElement = null;
    let pickerEndElement = null;
    let pickerStart = null;
    let pickerEnd = null;
    const dispatch = svelteCreateEventDispatcher();

    const pickerCallbacks = {
        startDateSelect: (e) => {
            const { date } = e.detail;
            pickerStartDate = date;
        },
        endDateSelect: (e) => {
            const { date } = e.detail;
            pickerEndDate = date;
        },
        startDateClear: () => {
            pickerStartDate = null;
        },
        endDateClear: () => {
            pickerEndDate = null;
        },
    };

    const getPickerOptions = (
        pickerElement,
        pickerDate,
        selectCb,
        clearCb,
    ) => ({
        element: pickerElement,
        date: pickerDate,
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css",
        ],
        zIndex: 10,
        setup(picker) {
            picker.on("select", selectCb);
            picker.on("clear", clearCb);
        },
    });

    $: dispatch("change", {
        start: pickerStartDate,
        end: pickerEndDate,
    });

    svelteLifecycleOnMount(async () => {
        pickerStart = new Easepick.create(
            getPickerOptions(
                pickerStartElement,
                pickerStartDate,
                pickerCallbacks.startDateSelect,
                pickerCallbacks.startDateClear,
            ),
        );
        pickerEnd = new Easepick.create(
            getPickerOptions(
                pickerEndElement,
                pickerEndDate,
                pickerCallbacks.endDateSelect,
                pickerCallbacks.endDateClear,
            ),
        );
    });
</script>

<div class="w-full mr-2 relative">
    <input
        type="text"
        bind:this={pickerStartElement}
        readonly
        class="bg-opacity-70 bg-gray-300 h-12 w-full border-nwoun cursor-pointer"
        placeholder={$localize("auction.search.dateStart")}
    />
    {#if pickerStartDate}
        <div
            on:keypress={() => pickerStart.clear()}
            on:click={() => pickerStart.clear()}
            class="absolute right-1 top-1 cursor-pointer"
        >
            <Icon data={faTimesCircle} scale={2} class="text-black mt-1" />
        </div>
    {/if}
</div>
<div class="w-full mr-2 relative">
    <input
        type="text"
        bind:this={pickerEndElement}
        readonly
        class="bg-opacity-70 bg-gray-300 h-12 w-full border-nwoun cursor-pointer"
        placeholder={$localize("auction.search.dateEnd")}
    />
    {#if pickerEndDate}
        <div
            on:keypress={() => pickerStart.clear()}
            on:keypress={() => pickerEnd.clear()}
            on:click={() => pickerStart.clear()}
            on:click={() => pickerEnd.clear()}
            class="absolute right-1 top-1 cursor-pointer"
        >
            <Icon data={faTimesCircle} scale={2} class="text-black mt-1" />
        </div>
    {/if}
</div>
