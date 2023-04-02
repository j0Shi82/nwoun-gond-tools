<script>
    import { localize } from "utils/imports/core";
    import { svelteCreateEventDispatcher } from "utils/imports/svelte";

    export let curQuality = "";
    const dispatch = svelteCreateEventDispatcher();

    $: dispatch("change", {
        value: curQuality,
    });
</script>

<div>
    <select
        bind:value={curQuality}
        class="block w-full form-select bg-gray-300 border-nwoun border-1 rounded-md bg-opacity-70 font-bold text-black h-12"
        id="grid-state"
        style="max-width: 160px; width: 160px"
    >
        <option value="">{$localize("auction.search.qualitySelect")}</option>
        <option value="Grey" selected={curQuality === "Grey" ? "selected" : ""}
            >{$localize("auction.search.qualities.Grey")}</option
        >
        <option
            value="White"
            selected={curQuality === "White" ? "selected" : ""}
            >{$localize("auction.search.qualities.White")}</option
        >
        <option
            value="Green"
            selected={curQuality === "Green" ? "selected" : ""}
            >{$localize("auction.search.qualities.Green")}</option
        >
        <option value="Blue" selected={curQuality === "Blue" ? "selected" : ""}
            >{$localize("auction.search.qualities.Blue")}</option
        >
        <option
            value="Purple"
            selected={curQuality === "Purple" ? "selected" : ""}
            >{$localize("auction.search.qualities.Purple")}</option
        >
        <option
            value="Legendary"
            selected={curQuality === "Legendary" ? "selected" : ""}
            >{$localize("auction.search.qualities.Legendary")}</option
        >
        <option
            value="Mythic"
            selected={curQuality === "Mythic" ? "selected" : ""}
            >{$localize("auction.search.qualities.Mythic")}</option
        >
    </select>
</div>
